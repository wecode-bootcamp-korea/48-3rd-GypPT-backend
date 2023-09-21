const express = require('express');

const consultantController = require('../controllers/consultantController');
const consultantRouter = express.Router();

const { loginRequired } = require('../utils/auth');

consultantRouter.post(
  '/posts/upload',
  loginRequired,
  consultantController.createConsultant
);
consultantRouter.delete(
  '/posts/:postId',
  loginRequired,
  consultantController.deleteConsultant
);
consultantRouter.get(
  '/posts/list/:thread_types_id',
  loginRequired,
  consultantController.getConsultant
);
consultantRouter.get(
  '/posts/:trainer_profiles_id',
  loginRequired,
  consultantController.getConsultantDetail
);

consultantRouter.post(
  '/posts',
  loginRequired,
  consultantController.addConsultantComment
);

module.exports = { consultantRouter };
