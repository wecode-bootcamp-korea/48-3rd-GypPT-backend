const postDao = require('../models/postDao');

const getPostListAll = async () => {
  return await postDao.getPostListAll();
};

module.exports = { getPostListAll };
