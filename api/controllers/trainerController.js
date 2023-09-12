const trainerService = require('../services/trainerService');
const { catchAsync } = require('../utils/error');

const getTrainerList = catchAsync(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const pageSize = parseInt(limit);
  const offset = (page - 1) * pageSize;

  const trainerList = await trainerService.getTrainerList(offset, pageSize);

  res.status(200).json({ data: trainerList });
});

module.exports = { getTrainerList };
