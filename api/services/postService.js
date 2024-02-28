const postDao = require('../models/postDao');

const getPostListAll = async () => {
  return await postDao.getPostListAll();
};

const getPostListDetail = async (postId) => {
  return await postDao.getPostListDetail(postId);
};

const postCommunity = async (userId, category, title, content, imageUrls) => {
  return await postDao.postCommunity(
    userId,
    category,
    title,
    content,
    imageUrls
  );
};

module.exports = {
  getPostListAll,
  getPostListDetail,
  postCommunity,
};
