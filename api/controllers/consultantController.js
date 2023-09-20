const consultantService = require('../services/consultantService');
const { catchAsync } = require('../utils/error');

const createConsultant = catchAsync(async (req, res) => {
  const { content, trainerId, threadTypesId = 3 } = await req.body;

  const userId = req.user.userId;

  await consultantService.createConsultThreads(
    userId,
    threadTypesId,
    content,
    trainerId
  );

  res.status(201).json({ message: 'success' });
});

const deleteConsultant = catchAsync(async (req, res) => {
  const threadId = req.params.postId;

  await consultantService.deleteConsultantThreads(threadId);

  res.status(201).json({ message: 'success' });
});

const getConsultant = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const threadTypesId = req.params.thread_types_id;

  const list = await consultantService.getConsultantList(userId, threadTypesId);

  res.status(201).json({ message: list });
});

const getConsultantDetail = catchAsync(async (req, res) => {
  const trainerProfileId = req.params.trainer_profiles_id;
  const threadId = req.params.thread_id;

  const detailList = await consultantService.getConsultantDetailList(
    trainerProfileId,
    threadId
  );

  res.status(201).json({ data: detailList });
});

module.exports = {
  createConsultant,
  deleteConsultant,
  getConsultant,
  getConsultantDetail,
};
