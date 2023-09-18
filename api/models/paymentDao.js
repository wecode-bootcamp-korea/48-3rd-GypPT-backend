const { dataSource } = require('./dataSource');

const getMembershipList = async (memberId) => {
  try {
    const data = await dataSource.query(
      `
      SELECT
        m.id,
        m.name,
        m.description,
        m.price,
        JSON_ARRAYAGG(mb.content) AS benefit
      FROM memberships m
      LEFT JOIN membership_benefits mb ON mb.membership_id = m.id
      WHERE EXISTS (SELECT 1 FROM users WHERE id = ?)
      GROUP BY m.id, m.name, m.description, m.price;
      `,
      [memberId]
    );
    return data;
  } catch (err) {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

const getMatchingTrainer = async (trainerId, memberId) => {
  try {
    const [data] = await dataSource.query(
      `
      SELECT
        u.id,
        tg.emoji,
        tg.name emojiName,
        u.nickname nickName,
        u.profile_image profileImage,
        tp.score,
        (
          SELECT JSON_ARRAYAGG(content)
          FROM (
            SELECT DISTINCT tc.content
            FROM trainer_careers tc
            WHERE tc.trainer_profile_id = tp.id
          ) AS careerSub
        ) career,
        (
          SELECT JSON_ARRAYAGG(content)
          FROM (
            SELECT DISTINCT tl.content
            FROM trainer_licenses tl
            WHERE tl.trainer_profile_id = tp.id
          ) AS licenseSub
        ) license,
        (
          SELECT JSON_ARRAYAGG(content)
          FROM (
            SELECT DISTINCT ta.content
            FROM trainer_awards ta
            WHERE ta.trainer_profile_id = tp.id
          ) AS awardSub
        ) awards
      FROM users u
      INNER JOIN trainer_profiles tp ON u.id = tp.user_id 
      INNER JOIN trainer_grades tg ON tg.id = tp.trainer_grade_id
      WHERE u.id = ? 
      AND EXISTS (SELECT 1 FROM users WHERE id = ?);
      `,
      [trainerId, memberId]
    );
    return data;
  } catch (err) {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

const isEnoughPointToPayForMembership = async (memberId, membershipId) => {
  try {
    const data = await dataSource.query(
      `
      SELECT id, name, price, description
      FROM memberships 
      WHERE id = ? 
      AND price > 
      (
        SELECT mp.point
			  FROM users u
			  LEFT JOIN member_profiles mp ON mp.user_id = u.id 
			  WHERE u.id = ?
      );
      `,
      [membershipId, memberId]
    );
    return data;
  } catch (err) {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

const isMembershipInUse = async (memberId) => {
  try {
    const data = await dataSource.query(
      `
      SELECT member_id, membership_id, trainer_id, start_date, end_date
      FROM members_memberships
      WHERE member_id = ?; 
      `,
      [memberId]
    );
    return data;
  } catch (err) {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

const payForMembership = async (
  memberId,
  membershipId,
  trainerId,
  paymentsMethodId
) => {
  const queryRunner = await dataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    await queryRunner.startTransaction();

    await dataSource.query(
      `
      INSERT INTO members_memberships (member_id, membership_id, trainer_id)
      SELECT ?, ?, ?
      WHERE EXISTS (SELECT 1 FROM users WHERE id = ?);
      `,
      [memberId, membershipId, trainerId, memberId]
    );

    const result = await dataSource.query(
      `
      INSERT INTO payments (user_id, membership_id, payments_method_id, price)
      VALUES (?, ?, ?, (SELECT price FROM memberships WHERE id = ?));
      `,
      [memberId, membershipId, paymentsMethodId, membershipId]
    );

    await queryRunner.query(
      `
      UPDATE member_profiles 
      SET member_grade_id = ?
      WHERE user_id = ?
      `,
      [membershipId, memberId]
    );

    await queryRunner.query(
      `
      UPDATE member_profiles
      SET point = point - 
      (
	      SELECT m.price
        FROM memberships m
        WHERE m.id = ?
      )
      WHERE user_id = ?;
      `,
      [membershipId, memberId]
    );

    const data = await queryRunner.query(
      `
      SELECT 
        u.nickname nickname,
        m.name membershipName,
        p.price membershipPrice,
        p.created_at paymentTime,
        pm.method paymentMethod,
        mp.point Balance
      FROM payments p 
      LEFT JOIN users u ON u.id = p.user_id 
      LEFT JOIN memberships m ON m.id = p.membership_id 
      LEFT JOIN payments_method pm ON pm.id = p.payments_method_id
      LEFT JOIN member_profiles mp ON mp.user_id = u.id
      WHERE p.user_id = ? AND p.id = ?;
      `,
      [memberId, result.insertId]
    );

    await queryRunner.commitTransaction();

    return data;
  } catch (err) {
    await queryRunner.rollbackTransaction();

    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  getMembershipList,
  getMatchingTrainer,
  isEnoughPointToPayForMembership,
  isMembershipInUse,
  payForMembership,
};
