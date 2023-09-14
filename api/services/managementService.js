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

module.exports = { getManagement, membershipStart };
