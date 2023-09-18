const trainerService = require('../services/trainerService');
const { catchAsync } = require('../utils/error');

const getTrainerList = catchAsync(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const trainerList = await trainerService.getTrainerList(page, limit);

  res.status(200).json({ data: trainerList });
});

module.exports = { getTrainerList };
