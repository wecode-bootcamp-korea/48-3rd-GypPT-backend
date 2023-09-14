const { dataSource } = require('./dataSource');

const getMembershipByUser = async (userId) => {
  try {
    const membership = await dataSource.query(
      `
     SELECT 
     m.name as membershipName,
     u.start_date as startDate,
     u.end_date as endDate
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
        id as exerciseId,
        name as exerciseName,
        description as exerciseDescription,
        image_url as exerciseImageUrl,
        checkbox as exerciseCheckbox
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
        id as dietId,
        name as dietName,
        description as dietDescription
     FROM diets
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

module.exports = {
  getExerciseList,
  getDietList,
  getMembershipByUser,
  membershipStart,
  getMembershipIdByUser,
};
