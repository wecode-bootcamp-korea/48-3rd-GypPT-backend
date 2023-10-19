const { dataSource } = require('./dataSource');

const getMembershipByUser = async (userId) => {
  try {
    const membership = await dataSource.query(
      `
     SELECT 
     m.name as membershipName,
     date_format(u.start_date, '%Y-%m-%d') as startDate,
     date_format(u.end_date, '%Y-%m-%d') as endDate
     FROM members_memberships u
     JOIN memberships m
     ON m.id = u.membership_id
     WHERE member_id = ?;
    `,
      [userId]
    );
    return membership;
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

const getExerciseList = async (memberId, weekday) => {
  try {
    const exerciseList = await dataSource.query(
      `
     SELECT 
        id,
        name,
        description,
        image_url as imageUrl,
        checkbox
     FROM exercises 
     WHERE member_id = ?
     AND weekday = ?;
    `,
      [memberId, weekday]
    );
    return exerciseList;
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

const getDietList = async (memberId, weekday) => {
  try {
    const dietList = await dataSource.query(
      `
     SELECT 
        d.id as id,
        d.name as name,
        d.description as description,
        i.image_url as imageUrl,
        d.checkbox as checkbox
     FROM diets d
     LEFT JOIN diet_images i
     ON d.id = i.diet_id
     WHERE member_id = ?
     AND weekday = ?;
    `,
      [memberId, weekday]
    );
    return dietList;
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

const membershipStart = async (startDate, endDate, membershipId, userId) => {
  try {
    const result = await dataSource.query(
      `
     UPDATE members_memberships
     SET start_date = ?,   
         end_date = ?
     WHERE membership_id = ?
     AND member_id = ?;
    `,
      [startDate, endDate, membershipId, userId]
    );
    return result;
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

const getMembershipIdByUser = async (userId) => {
  try {
    const membershipId = await dataSource.query(
      `
    SELECT membership_id
    FROM members_memberships
    WHERE member_id = ?;
    `,
      [userId]
    );
    return membershipId;
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

const checkExercise = async (checkbox, memberId, weekday, exerciseId) => {
  try {
    return await dataSource.query(
      `
    UPDATE exercises
    SET checkbox = ?
    WHERE member_id = ?
    AND weekday = ?
    ANd id = ?;
    `,
      [checkbox, memberId, weekday, exerciseId]
    );
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

const checkDiet = async (checkbox, memberId, weekday, dietId) => {
  try {
    return await dataSource.query(
      `
    UPDATE diets
    SET checkbox = ?
    WHERE member_id = ?
    AND weekday = ?
    ANd id = ?;
    `,
      [checkbox, memberId, weekday, dietId]
    );
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

const getThreadId = async (userId, trainerId) => {
  try {
    let trainerProfileId = await dataSource.query(
      `
    SELECT id
    FROM threads
    WHERE user_id = ?
    AND trainer_profile_id = ?;
    `,
      [userId, trainerId]
    );
    if (trainerProfileId.length === 0) {
      trainerProfileId = null;
      return trainerProfileId;
    } else {
      return trainerProfileId[0].id;
    }
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

const addDietImage = async (dietId, imageUrl) => {
  try {
    await dataSource.query(
      `INSERT INTO diet_images (diet_id, image_url) VALUES (?,?)`,
      [dietId, imageUrl]
    );
  } catch (err) {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getExerciseList,
  getDietList,
  getMembershipByUser,
  membershipStart,
  getMembershipIdByUser,
  checkExercise,
  checkDiet,
  getThreadId,
  addDietImage,
};
