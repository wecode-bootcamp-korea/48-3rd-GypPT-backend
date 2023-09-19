const consultantDao = require('../models/consultantDao');

const createConsultThreads = async (userId, threadTypesId, content, trainerId) => {
    const result =  await consultantDao.createConsultant(userId, threadTypesId, content, trainerId);

    return result;
  };  

const deleteConsultantThreads = async (threadId) => {
    const result = await consultantDao.deleteConsultant(threadId)
    return result
}

module.exports = { createConsultThreads,
deleteConsultantThreads };