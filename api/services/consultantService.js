const consultantDao = require('../models/consultantDao');

const createConsultThreads = async (
  userId,
  threadTypesId,
  content,
  trainerProfileId
) => {
  const result = await consultantDao.createConsultant(
    userId,
    threadTypesId,
    content,
    trainerProfileId
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

const getConsultantDetailList = async (trainerProfileId, userId) => {
  const result = await consultantDao.getConsultantDetail(
    trainerProfileId,
    userId
  );

  return result;
};

const addConsultantComment = async (
  userId,
  threadId,
  commentsTypeId,
  content
) => {
  await consultantDao.addConsultantComment(
    userId,
    threadId,
    commentsTypeId,
    content
  );
};

const getCommentsTypeId = async (userType) => {
  return await consultantDao.getCommentsTypeId(userType);
};

module.exports = {
  createConsultThreads,
  deleteConsultantThreads,
  getConsultantList,
  getConsultantDetailList,
  addConsultantComment,
  getCommentsTypeId,
};
