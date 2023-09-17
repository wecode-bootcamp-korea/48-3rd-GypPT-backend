const { dataSource } = require('./dataSource');

const getUserByEmail = async (email) => {
  try {
    const user = await dataSource.query(
      `
    SELECT
      u.email,
      u.nickname,
      u.profile_image,
      mp.user_id AS userId,
      mp.member_grade_id AS memberGradeId,
      mp.height,
      mp.weight,
      mp.age,
      mp.gender,
      mp.point,
      um.membership_id AS membershipId,
      um.start_date AS startDate,
      um.end_date AS endDate
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

const createUser = async (email, gender, age) => {
  try {
    createUserResult = await dataSource.query(
      `INSERT INTO users (email)
     VALUES (?)`,
      [email]
    );
    const userId = await createUserResult.insertId;
    await dataSource.query(
      `INSERT INTO member_profiles (user_id, gender, age)
     VALUES (?, ?, ?)`,
      [userId, gender, age]
    );
  } catch (err) {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

const checkDuplicateNickname = async (nickname) => {
  try {
    const [result] = await dataSource.query(
      `SELECT nickname FROM users WHERE nickname=?`,
      [nickname]
    );
    return result;
  } catch (err) {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

const addAdditionalInfo = async (email, nickname, height, weight) => {
  try {
    await dataSource.query(`UPDATE users SET nickname =? WHERE email=?;`, [
      nickname,
      email,
    ]);
    const [{ id: userId }] = await dataSource.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );
    await dataSource.query(
      `UPDATE member_profiles SET height = ?, weight = ? WHERE user_id = ?`,
      [height, weight, userId]
    );
  } catch (err) {
    const error = new Error('dataSource Error');
    error.statusCode = 400;

    throw error;
  }
};

const getUserType = async (email) => {
  try {
    const [userType] = await dataSource.query(
      `SELECT 
        CASE 
          WHEN EXISTS(
            SELECT tf.user_id 
            FROM trainer_profiles tf 
            INNER JOIN users u 
            WHERE u.email = ?
          ) THEN 'trainer' 
          WHEN EXISTS(
            SELECT mf.user_id 
            FROM member_profiles mf 
            INNER JOIN users u 
            WHERE u.email = ?
          ) THEN 'member'
        END AS user_type`,
      [email, email]
    );
    return userType;
  } catch (err) {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

const getGrade = async (userType, email) => {
  try {
    const [grade] = await dataSource.query(
      `SELECT g.name AS grade FROM users u INNER JOIN ${userType}_profiles p ON u.id = p.user_id INNER JOIN ${userType}_grades g ON p.${userType}_grade_id = g.id WHERE u.email = ?`,
      [email]
    );
    return grade;
  } catch (err) {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getUserByEmail,
  createUser,
  checkDuplicateNickname,
  addAdditionalInfo,
  getUserType,
  getGrade,
};
