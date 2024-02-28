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
    const newError = new Error('dataSource Error');
    newError.status = 400;
    throw newError;
  }
};

const getPostListDetail = async (postId) => {
  try {
    const postListDetail = await dataSource.query(
      `
      SELECT
        t.id AS threadId,
        mg.name AS memberGrades,
        u.nickname,
        tt.id AS category,
        t.title,
        t.content,
        ti.image_url AS imageUrl,
        DATE_FORMAT(t.created_at, '%Y.%m.%d') AS time,
        (
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
        'commentId', c.id,
        'commentTime', DATE_FORMAT(c.created_at, '%Y.%m.%d'),
        'nickname', cu.nickname,
        'content', c.content
        )
      )
      FROM (
        SELECT *
        FROM comments
        WHERE thread_id = t.id
        ORDER BY created_at DESC
        LIMIT 10000
        ) c
      LEFT JOIN users cu ON cu.id = c.user_id
        ) AS comments
      FROM threads t
      LEFT JOIN thread_types tt ON t.thread_types_id = tt.id
      LEFT JOIN thread_images ti ON t.id = ti.thread_id
      LEFT JOIN users u ON u.id = t.user_id
      LEFT JOIN member_profiles mp ON mp.user_id = u.id
      LEFT JOIN member_grades mg ON mp.member_grade_id = mg.id
      WHERE t.id = ?
      GROUP BY t.id, tt.id, mg.name, u.nickname, t.title, t.content, ti.image_url, t.created_at
      ORDER BY t.created_at DESC;
      `,
      [postId]
    );
    return postListDetail;
  } catch (error) {
    throw error;
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

const postCommunity = async (userId, category, title, content, imageUrls) => {
  try {
    const result = await dataSource.query(
      `
      INSERT INTO threads (
        user_id,
        thread_types_id,
        title,
        content
      ) VALUES (
      ?,
      ?,
      ?,
      ?
      )
      `,
      [userId, category, title, content]
    );
    const insertThreadId = result.insertId;
    if (!imageUrls) {
      return insertThreadId;
    } else {
      for (imageUrl of imageUrls) {
        addPostImage(insertThreadId, imageUrl);
      }
      return insertThreadId;
    }
  } catch (error) {
    console.error('Error in postCommunity:', error);
    throw new error('Internal Server Error');
  }
};

const addPostImage = async (threadId, imageUrl) => {
  try {
    dataSource.query(
      `INSERT INTO thread_images (thread_id, image_url) VALUES (?,?)`,
      [threadId, imageUrl]
    );
  } catch (err) {
    const newError = new Error('dataSource Error');
    newError.status = 400;
    throw newError;
  }
};

module.exports = {
  getPostListAll,
  getPostListDetail,
  postCommunity,
};
