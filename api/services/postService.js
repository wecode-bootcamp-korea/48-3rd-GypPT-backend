const postDao = require('../models/postDao');

const getPostListAll = async () => {
  return await postDao.getPostListAll();
};

const getPostListDetail = async (postId) => {
  return await postDao.getPostListDetail(postId);
};

module.exports = { getPostListAll, getPostListDetail };
