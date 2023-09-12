const { catchAsync } = require('../utils/error');
const postService = require('../services/postService');

const getPostListAll = catchAsync(async (req, res) => {
  const allPosts = await postService.getPostListAll();

  res.status(201).json({ data: allPosts });
});

module.exports = { getPostListAll };
