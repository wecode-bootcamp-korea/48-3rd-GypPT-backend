const managementDao = require('../models/managementDao');

const getManagement = async (userId, weekday) => {
  const membership = await managementDao.getMembershipByUser(userId);
  const exercise = await managementDao.getExerciseList(userId, weekday);
  const diet = managementDao.getDietList(userId, weekday);

  const [membershipResult, exerciseResult, dietResult] = await Promise.all([
    membership,
    exercise,
    diet,
  ]);

  return {
    membership: membershipResult,
    exercise: exerciseResult,
    diet: dietResult,
  };
};

const membershipStart = async (userId, startDate, endDate) => {
  const membershipIds = await managementDao.getMembershipIdByUser(userId);
  const membershipId = membershipIds[0].membership_id;

  return await managementDao.membershipStart(
    startDate,
    endDate,
    membershipId,
    userId
  );
};

const checkExercise = async (checkbox, memberId, weekday, exerciseId) => {
  return await managementDao.checkExercise(
    checkbox,
    memberId,
    weekday,
    exerciseId
  );
};

const checkDiet = async (checkbox, memberId, weekday, dietId) => {
  return await managementDao.checkDiet(checkbox, memberId, weekday, dietId);
};

const getThreadId = async (userId, trainerId) => {
  let trainerProfileId = await managementDao.getThreadId(userId, trainerId);
  let result = 'TRUE';
  if (trainerProfileId == null) {
    result = 'FALSE';
  }
  return result;
};

module.exports = {
  getManagement,
  membershipStart,
  checkExercise,
  checkDiet,
  getThreadId,
};
