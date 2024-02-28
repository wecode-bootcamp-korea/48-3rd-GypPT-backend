const express = require('express');
const managementRouter = express.Router();
const { upload } = require('../utils/aws');

const managementController = require('../controllers/managementController');
const { loginRequired } = require('../utils/auth');

managementRouter.get('', loginRequired, managementController.getManagement);
managementRouter.post(
  '/start',
  loginRequired,
  managementController.membershipStart
);
managementRouter.post(
  '/checkExercise',
  loginRequired,
  managementController.checkExercise
);
managementRouter.post(
  '/checkDiet',
  loginRequired,
  managementController.checkDiet
);

managementRouter.get(
  '/checkId',
  loginRequired,
  managementController.checkThreadId
);

managementRouter.post(
  '/diet-image',
  loginRequired,
  upload.single('selectedFile'),
  managementController.addDietImage
);

module.exports = { managementRouter };
