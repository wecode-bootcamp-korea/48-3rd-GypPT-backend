const paymentService = require('../services/paymentService');
const { catchAsync } = require('../utils/error');

const getMembershipList = catchAsync(async (req, res) => {
  const memberId = req.user.userId;
  const membershipList = await paymentService.getMembershipList(memberId);

  res.status(200).json({ membershipData: membershipList });
});

const getMatchingTrainer = catchAsync(async (req, res) => {
  const memberId = req.user.userId;
  const { trainerId } = req.body;

  const matchingTrainer = await paymentService.getMatchingTrainer(
    trainerId,
    memberId
  );

  res.status(200).json({ trainerData: matchingTrainer });
});

const payForMembership = catchAsync(async (req, res) => {
  const memberId = req.user.userId;
  const { trainerId, membershipId, paymentsMethodId } = req.body;

  const paymentInformation = await paymentService.payForMembership(
    memberId,
    membershipId,
    trainerId,
    paymentsMethodId
  );

  res
    .status(200)
    .json({ message: 'Payment completed', data: paymentInformation });
});

module.exports = {
  getMembershipList,
  getMatchingTrainer,
  payForMembership,
};
