const { dataSource } = require('./dataSource');

const createConsultant = async (
  userId,
  threadTypesId,
  content,
  trainerProfileId
) => {
  try {
    await dataSource.query(
      `
    INSERT INTO threads (
        user_id,
        thread_types_id,
        content,
        trainer_profile_id
    ) VALUES (
        ?,
        ?,
        ?,
        ?
    )
     `,
      [userId, threadTypesId, content, trainerProfileId]
    );
  } catch {
    const error = new Error('error');
    error.statusCode = 400;
    throw error;
  }
};

const deleteConsultant = async (threadId) => {
  const queryRunner = await dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.query(
      `
                DELETE FROM comments
                WHERE thread_id = ?
                `,
      [threadId]
    );
    await queryRunner.query(
      `
            DELETE FROM threads
            WHERE id = ?
            `,
      [threadId]
    );

    await queryRunner.commitTransaction();
  } catch {
    await queryRunner.rollbackTransaction();
    const error = new Error('error');
    error.statusCode = 400;
    throw error;
  } finally {
    await queryRunner.release();
  }
};

const getConsultant = async (userId, threadTypesId) => {
  try {
    const data = await dataSource.query(
      `
        select 
        t.id as thread_id, 
        t.thread_types_id, 
        t.content, 
        t.trainer_profile_id,
        t.created_at, 
        tt.name as threadTypeName, 
        u.nickname as trainerNickname, 
        u.profile_image as trainerProfileImage,
        tg.name as emojiName
        from threads t 
        
        join thread_types tt 
        
        on tt.id = t.thread_types_id 
        
        join trainer_profiles tp 
        
        on tp.id = t.trainer_profile_id
        
        Join users u
        
        On t.user_id = u.id
        
        Join trainer_grades tg
        
        On tg.id = tp.trainer_grade_id

        WHERE t.user_id = ? AND tt.id = ?
        `,
      [userId, threadTypesId]
    );
    return data;
  } catch {
    const error = new Error('error');
    error.statusCode = 400;
    throw error;
  }
};

const getConsultantDetail = async (trainerProfileId, threadId) => {
  try {
    const data = await dataSource.query(
      `
SELECT
t.id AS threadId,
u.profile_image AS trainerProfileImage,
(select u.nickname
from users u 
left join trainer_profiles t
on u.id = t.user_id
where t.id = tp.id)AS trainerNickname,
tg.name AS trainerEmojiName,
mg.name AS userEmojiName,
u.nickname AS userNickname,
t.content,
t.created_at AS createdAt,
JSON_ARRAYAGG(
JSON_OBJECT(
'commentId', c.id,
'nickname', cu.nickname,
'content', c.content,
'emojiName', mg.emoji,
'commentAt', c.created_at
)
) AS comments
FROM threads t
LEFT JOIN users u ON u.id = t.user_id
LEFT JOIN member_profiles mp ON mp.user_id = u.id
LEFT JOIN member_grades mg ON mp.member_grade_id = mg.id
LEFT JOIN comments c ON c.thread_id = t.id
LEFT JOIN users cu ON cu.id = c.user_id
LEFT JOIN trainer_profiles tp ON tp.id = t.trainer_profile_id
LEFT JOIN users tu ON tu.id = tp.user_id
LEFT JOIN trainer_grades tg ON tg.id = tp.trainer_grade_id
WHERE t.id = ?
GROUP BY t.id, mg.name, u.nickname, u.profile_image, t.content, t.created_at, tu.nickname, tg.name;
`,
      [trainerProfileId, threadId]
    );
    return data;
  } catch {
    const error = new Error('error');
    error.statusCode = 400;
    throw error;
  }
};

const addConsultantComment = async (
  userId,
  threadId,
  commentsTypeId,
  content
) => {
  try {
    await dataSource.query(
      `INSERT INTO comments (user_id, thread_id, comment_types_id, content) VALUES (?,?,?,?)`,
      [userId, threadId, commentsTypeId, content]
    );
  } catch (err) {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

const getCommentsTypeId = async (userType) => {
  try {
    const [{ id: commentsTypeId }] = await dataSource.query(
      `SELECT id FROM comment_types ct WHERE ct.name=?`,
      [userType]
    );
    return commentsTypeId;
  } catch (err) {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createConsultant,
  deleteConsultant,
  getConsultant,
  getConsultantDetail,
  addConsultantComment,
  getCommentsTypeId,
};
