const managementService = require('../services/managementService');
const { catchAsync } = require('../utils/error');
const { addDays, format } = require('date-fns');

const getManagement = catchAsync(async (req, res) => {
  const { userId, weekday } = req.query;
  const membership = await managementService.getManagement(userId, weekday);
  res.json(membership);
});

const membershipStart = catchAsync(async (req, res) => {
  const { userId, startDate } = req.body;

  const startDateObject = new Date(startDate);
  const after30Days = addDays(startDateObject, 30);
  const endDate = format(after30Days, 'yyyy-MM-dd');

  await managementService.membershipStart(userId, startDate, endDate);
  res.status(200).json({ message: 'SUCCESS' });
});

module.exports = { getManagement, membershipStart };
