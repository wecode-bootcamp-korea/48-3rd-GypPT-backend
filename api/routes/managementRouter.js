const express = require('express');
const managementRouter = express.Router();

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
module.exports = { managementRouter };
