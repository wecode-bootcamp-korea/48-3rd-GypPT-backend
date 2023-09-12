const { dataSource } = require('./dataSource');

const getPostListAll = async () => {
  try {
    const postListAll = await dataSource.query(
      `
      SELECT
        t.id AS threadId,
        tt.id AS category,
        mg.name AS memberGrades,
        u.nickname,
        t.title,
        t.content,
        ti.image_url AS imageUrl,
        DATE_FORMAT(t.created_at, '%Y.%m.%d') AS time
        FROM threads t
        LEFT JOIN thread_types tt ON t.thread_types_id = tt.id
        LEFT JOIN thread_images ti ON t.id = ti.thread_id
        LEFT JOIN users u ON u.id = t.user_id
        LEFT JOIN member_profiles mp ON mp.user_id = u.id
        LEFT JOIN member_grades mg ON mp.member_grade_id = mg.id
        ORDER BY t.created_at DESC;
      `
    );

    const postListWithComments = await Promise.all(
      postListAll.map(async (post) => {
        const commentsString = await getCommentsCountForThread(post.threadId);
        const comments = parseInt(commentsString);
        return { ...post, comments };
      })
    );

    return postListWithComments;
  } catch (error) {
    console.log(error);
    const newError = new Error('dataSource Error');
    newError.status = 400;
    throw newError;
  }
};

const getCommentsCountForThread = async (threadId) => {
  const query = `
    SELECT COUNT(*) as commentCount FROM comments WHERE thread_id = ?
  `;
  const params = [threadId];
  const result = await dataSource.query(query, params);
  return result[0].commentCount;
};

module.exports = { getPostListAll };
