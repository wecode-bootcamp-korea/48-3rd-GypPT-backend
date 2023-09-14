const { dataSource } = require('./dataSource');

const getTrainerList = async (offset, pageSize) => {
  try {
    const data = await dataSource.query(
      `
      SELECT
        u.id,
        tg.emoji,
        tg.name emojiName,
        u.nickname nickName,
        u.profile_image profileImage,
        tp.score,
        (
          SELECT 
            JSON_ARRAYAGG(content)
          FROM (
            SELECT DISTINCT tc.content
            FROM trainer_careers tc
            WHERE tc.trainer_profile_id = tp.id
          ) AS careerSub
        ) career,
        (
          SELECT
            JSON_ARRAYAGG(content)
          FROM (
            SELECT DISTINCT tl.content
            FROM trainer_licenses tl
            WHERE tl.trainer_profile_id = tp.id
          ) AS licenseSub
        ) license,
        (
          SELECT
            JSON_ARRAYAGG(content)
          FROM (
            SELECT DISTINCT ta.content
            FROM trainer_awards ta
            WHERE ta.trainer_profile_id = tp.id
          ) AS awardSub
        ) awards
      FROM users u
      INNER JOIN trainer_profiles tp ON u.id = tp.user_id 
      INNER JOIN trainer_grades tg ON tg.id = tp.trainer_grade_id
      ORDER BY tp.score DESC, u.created_at DESC
      LIMIT ?, ?;
      `,
      [offset, pageSize]
    );
    return data;
  } catch (err) {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

module.exports = { getTrainerList };
