const { dataSource } = require('../api/models/dataSource');

const truncateTables = async (tableList) => {
  await dataSource.query(`SET FOREIGN_KEY_CHECKS=0`);

  for (let table of tableList) {
    await dataSource.query(`TRUNCATE table ${table}`);
  }

  await dataSource.query(`SET FOREIGN_KEY_CHECKS=1`);
};

module.exports = { truncateTables };
