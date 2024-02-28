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
  const userId = req.user.userId;
  const threadTypesId = req.params.thread_types_id;

  const list = await consultantService.getConsultantList(userId, threadTypesId);

  res.status(201).json({ message: list });
});

const getConsultantDetail = catchAsync(async (req, res) => {
  const trainerProfileId = req.query.trainerProfileId;
  const userId = req.user.userId;

  const detailList = await consultantService.getConsultantDetailList(
    trainerProfileId,
    userId
  );

  res.status(201).json({ data: detailList });
});

const addConsultantComment = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const userType = res.locals.userType;
  const { postId: threadId } = req.query;
  const { content } = req.body;
  const commentsTypeId = await consultantService.getCommentsTypeId(userType);

  if (!content) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  } else {
    await consultantService.addConsultantComment(
      userId,
      threadId,
      commentsTypeId,
      content
    );
    res.status(201).json({ message: 'CREATE COMMENT SUCCESS' });
  }
});

module.exports = {
  createConsultant,
  deleteConsultant,
  getConsultant,
  getConsultantDetail,
  addConsultantComment,
};
