const postDao = require('../models/postDao');

const getPostList = async (threadTypesId, userId) => {
  return await postDao.getPostList(threadTypesId, userId);
};

module.exports = { getPostList };
