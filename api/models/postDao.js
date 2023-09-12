const { dataSource } = require('./dataSource');

const getPostList = async (threadTypesId, userId) => {
  try {
    // console.log(threadTypesId, userId);
    const postlist = await dataSource.query(
      `
        SELECT
        t.id AS threadId,
        tt.name AS category,
        mg.name AS grade,
        u.nickname,
        t.title,
        t.content,
        ti.image_url AS imageUrl,
        DATE_FORMAT(t.created_at, '%Y-%m-%d') AS time,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'commentId', c.id,
                'commentTime', DATE_FORMAT(c.created_at, '%Y-%m-%d'),
                'nickname', cu.nickname,
                'content', c.content
            )
        ) AS comments
        FROM threads t
        LEFT JOIN thread_types tt ON t.thread_types_id = tt.id
        LEFT JOIN thread_images ti ON t.id = ti.thread_id
        LEFT JOIN users u ON u.id = t.user_id
        LEFT JOIN member_profiles mp ON mp.user_id = u.id
        LEFT JOIN member_grades mg ON mp.member_grade_id = mg.id
        LEFT JOIN comments c ON c.thread_id = t.id
        LEFT JOIN comment_types ct ON ct.id = c.comment_types_id
        LEFT JOIN users cu ON cu.id = c.user_id
        WHERE t.user_id = ?
        AND t.thread_types_id = ?
        GROUP BY t.id, tt.name, mg.name, u.nickname, t.title, t.content, ti.image_url, t.created_at
        ORDER BY t.created_at DESC
        `,
      [threadTypesId, userId]
    );
    return postlist;
  } catch (error) {
    console.log(error);
    const newError = new Error('dataSoure Error');
    newError.status = 400;
    throw newError;
  }
};

module.exports = { getPostList };
