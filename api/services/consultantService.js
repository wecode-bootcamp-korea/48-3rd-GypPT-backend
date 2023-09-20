const consultantDao = require('../models/consultantDao');

const createConsultThreads = async (
  userId,
  threadTypesId,
  content,
  trainerId
) => {
  const result = await consultantDao.createConsultant(
    userId,
    threadTypesId,
    content,
    trainerId
  );

  return result;
};

const deleteConsultantThreads = async (threadId) => {
  const result = await consultantDao.deleteConsultant(threadId);
  return result;
};

const getConsultantList = async (userId, threadTypesId) => {
  const result = await consultantDao.getConsultant(userId, threadTypesId);

  return result;
};

const getConsultantDetailList = async (trainerProfileId, threadId) => {
  const result = await consultantDao.getConsultantDetail(
    trainerProfileId,
    threadId
  );

  return result;
};

module.exports = {
  createConsultThreads,
  deleteConsultantThreads,
  getConsultantList,
  getConsultantDetailList,
};
