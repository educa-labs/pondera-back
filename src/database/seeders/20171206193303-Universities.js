const fs = require('fs');

const seeder = [];

const file = fs.readFile('universities.csv', 'utf8', (err, data) => {
  const dataArray = data.split(/\r?\n/);
  for (let line in dataArray) {
    line = dataArray[line].split(',');
    line[0] = parseInt(line[0], 10);
    seeder.push({ id: line[0], title: line[1] });
  }
  return seeder;
})
console.log(file);
console.log(seeder);
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Universities', seeder, {}),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
