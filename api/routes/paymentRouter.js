const express = require('express');

const paymentController = require('../controllers/paymentController');
const { loginRequired } = require('../utils/auth');

const paymentRouter = express.Router();

paymentRouter.get(
  '/membership-list',
  loginRequired,
  paymentController.getMembershipList
);
paymentRouter.post(
  '/trainer-information',
  loginRequired,
  paymentController.getMatchingTrainer
);
paymentRouter.post(
  '/request',
  loginRequired,
  paymentController.payForMembership
);

module.exports = { paymentRouter };
