const express = require('express');
const postController = require('../controllers/postController');
const postRouter = express.Router();
const { upload } = require('../utils/aws');
const { loginRequired } = require('../utils/auth');

postRouter.get('/posts/all', postController.getPostListAll);
postRouter.get('/posts/:postId', postController.getPostListDetail);
postRouter.post(
  '/posts/upload',
  loginRequired,
  upload.array('selectedFile'),
  postController.postCommunity
);

module.exports = { postRouter };
