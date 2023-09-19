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

const postCommunity = catchAsync(async (req, res) => {
  const { userId, category, title, content } = req.body;
  const thread = await postService.postCommunity(
    userId,
    category,
    title,
    content
  );
  res.status(201).json({ message: 'Post created successfully', thread });
});

module.exports = { getPostListAll, getPostListDetail, postCommunity };
