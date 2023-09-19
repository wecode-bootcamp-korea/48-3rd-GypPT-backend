const postDao = require('../models/postDao');

const getPostListAll = async () => {
  return await postDao.getPostListAll();
};

const getPostListDetail = async (postId) => {
  return await postDao.getPostListDetail(postId);
};

const postCommunity = async (userId, category, title, content) => {
  return await postDao.postCommunity(userId, category, title, content);
};

module.exports = { getPostListAll, getPostListDetail, postCommunity };
