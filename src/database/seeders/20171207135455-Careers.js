const fs = require('fs');

let seeder = [];

let file = fs.readFileSync('careers.csv', 'utf8').toString().split('\n');
for (let a in file) {
  file[a] = file[a].split(',');
  if (file[a][0] !== 'id' && file[a][0] !== '') {
    seeder.push({ id: parseInt(file[a][0]), title: file[a][1], createdAt: new Date(), updatedAt: new Date()  });
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Careers', seeder, {}),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};

