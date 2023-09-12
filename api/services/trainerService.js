const trainerDao = require('../models/trainerDao');

const getTrainerList = async (offset, pageSize) => {
  return await trainerDao.getTrainerList(offset, pageSize);
};

module.exports = { getTrainerList };
