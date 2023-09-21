const managementService = require('../services/managementService');
const { catchAsync } = require('../utils/error');
const { addDays, format } = require('date-fns');

const getManagement = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { weekday } = req.query;
  const membership = await managementService.getManagement(userId, weekday);

  res.status(200).json(membership);
});

const membershipStart = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { startDate } = req.body;

  const startDateObject = new Date(startDate);
  const after30Days = addDays(startDateObject, 30);
  const endDate = format(after30Days, 'yyyy-MM-dd');

  await managementService.membershipStart(userId, startDate, endDate);
  res.status(200).json({ message: 'SUCCESS' });
});

const checkExercise = catchAsync(async (req, res) => {
  const memberId = req.user.userId;
  const { id, checked, selectedDate } = req.body;
  const checkbox = checked;
  const weekday = selectedDate;
  const exerciseId = id;
  await managementService.checkExercise(
    checkbox,
    memberId,
    weekday,
    exerciseId
  );
  res.status(200).json({ message: 'SUCCESS' });
});

const checkDiet = catchAsync(async (req, res) => {
  const memberId = req.user.userId;
  const { id, checked, selectedDate } = req.body;
  const checkbox = checked;
  const weekday = selectedDate;
  const dietId = id;
  await managementService.checkDiet(checkbox, memberId, weekday, dietId);
  res.status(200).json({ message: 'SUCCESS' });
});

const checkThreadId = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const { trainerId } = req.query;

  const result = await managementService.getThreadId(userId, trainerId);
  res.status(200).json({ message: result });
});

module.exports = {
  getManagement,
  membershipStart,
  checkExercise,
  checkDiet,
  checkThreadId,
};
