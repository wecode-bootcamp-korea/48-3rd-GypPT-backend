const trainerDao = require('../models/trainerDao');

const getTrainerList = async (page, limit) => {
  const pageSize = parseInt(limit);
  const offset = (page - 1) * pageSize;

  return await trainerDao.getTrainerList(offset, pageSize);
};

module.exports = { getTrainerList };
