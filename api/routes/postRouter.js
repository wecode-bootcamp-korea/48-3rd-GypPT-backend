const express = require('express');
const postController = require('../controllers/postController');
const postRouter = express.Router();

postRouter.get('/posts/all', postController.getPostList);

module.exports = { postRouter };
