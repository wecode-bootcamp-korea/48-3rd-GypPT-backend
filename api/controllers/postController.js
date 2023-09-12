const { catchAsync } = require('../utils/error');
const postService = require('../services/postService');

const getPostList = catchAsync(async (req, res) => {
  const { threadTypesId, userId } = req.body;
  const posts = await postService.getPostList(threadTypesId, userId);
  res.status(201).json({ data: posts });
});

module.exports = { getPostList };
