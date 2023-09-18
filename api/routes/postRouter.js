const express = require('express');
const postController = require('../controllers/postController');
const postRouter = express.Router();

postRouter.get('/posts/all', postController.getPostListAll);
postRouter.get('/posts/:postId', postController.getPostListDetail);

module.exports = { postRouter };
