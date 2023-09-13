const { dataSource } = require('./dataSource');
const getUserByEmail = async (email) => {
  try {
    const user = await dataSource.query(
      `
    SELECT
      u.email,
      u.nickname,
      u.profile_image,
      mp.user_id,
      mp.member_grade_id,
      mp.height,
      mp.weight,
      mp.age,
      mp.gender,
      mp.point,
      um.membership_id,
      um.start_date,
      um.end_date
    FROM USERS u
    LEFT JOIN member_profiles mp ON u.id = mp.user_id
    LEFT JOIN users_memberships um ON u.id = um.user_id
    WHERE u.email = ?;
  `,
      [email]
    );
    return user;
  } catch (err) {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

module.exports = { getUserByEmail};
