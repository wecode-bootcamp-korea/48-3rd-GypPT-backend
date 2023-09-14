const paymentDao = require('../models/paymentDao');

const getMembershipList = async (memberId) => {
  const memberShipList = await paymentDao.getMembershipList(memberId);
  if (memberShipList.length === 0) throw new Error('Permission denied');
  return memberShipList;
};

const getMatchingTrainer = async (trainerId, memberId) => {
  const matchingTrainer = await paymentDao.getMatchingTrainer(
    trainerId,
    memberId
  );
  if (matchingTrainer.length === 0) throw new Error('Trainer not found');
  return matchingTrainer;
};

const payForMembership = async (
  memberId,
  membershipId,
  trainerId,
  paymentsMethodId
) => {
  const membersPoint = await paymentDao.isEnoughPointToPayForMembership(
    memberId,
    membershipId
  );

  if (membersPoint.length === 1) throw new Error('Insufficient balance');

  const membershipInUse = await paymentDao.isMembershipInUse(memberId);

  if (membershipInUse.length === 0) {
    return await paymentDao.payForMembership(
      memberId,
      membershipId,
      trainerId,
      paymentsMethodId
    );
  } else if (membershipInUse.length === 1) {
    throw new Error('Already in use');
  } else {
    throw new Error('Payment Error');
  }
};

module.exports = {
  getMembershipList,
  getMatchingTrainer,
  payForMembership,
};
