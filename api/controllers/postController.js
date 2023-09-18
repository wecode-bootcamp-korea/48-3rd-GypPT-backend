const { catchAsync } = require('../utils/error');
const postService = require('../services/postService');

const getPostListAll = catchAsync(async (req, res) => {
  const allPosts = await postService.getPostListAll();

  res.status(201).json({ data: allPosts });
});

const getPostListDetail = catchAsync(async (req, res) => {
  const postId = req.params.postId;
  const post = await postService.getPostListDetail(postId);
  res.status(201).json({ data: post });
});

module.exports = { getPostListAll, getPostListDetail };
