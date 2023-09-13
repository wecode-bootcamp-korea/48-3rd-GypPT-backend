const consultantDao = require('../models/consultantDao');

const createConsultThreads = async (userId, threadTypesId, content, trainerId) => {
    const result =  await consultantDao.createConsultant(userId, threadTypesId, content, trainerId);
  };  

module.exports = { createConsultThreads };