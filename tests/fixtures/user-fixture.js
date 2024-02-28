const { dataSource } = require('../../api/models/dataSource');

const createMeberGrades = async (memberGradeList) => {
  let data = [];
  for (memberGrade of memberGradeList) {
    data.push([memberGrade.id, memberGrade.name, memberGrade.emoji]);
  }
  return await dataSource.query(
    `INSERT INTO member_grades (id, name, emoji) VALUES ?`,
    [data]
  );
};

const createMembers = async (memberList) => {
  let userData = [];
  let memberProfileData = [];
  for (member of memberList) {
    userData.push([member.id, member.email, member.nickname]);
    memberProfileData.push([
      member.id,
      member.gradeId,
      member.height,
      member.weight,
      member.age,
      member.gender,
    ]);
  }
  await dataSource.query(`INSERT INTO users (id, email, nickname) VALUES ?`, [
    userData,
  ]);
  await dataSource.query(
    `INSERT INTO member_profiles (user_id, member_grade_id, height, weight, age, gender) VALUES ?`,
    [memberProfileData]
  );
};

module.exports = { createMeberGrades, createMembers };
