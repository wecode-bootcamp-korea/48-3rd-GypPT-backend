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
module.exports = { createConsultant, deleteConsultant, getConsultant };
