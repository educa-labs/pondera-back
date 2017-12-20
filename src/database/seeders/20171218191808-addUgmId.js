'use strict';
const Papa = require('papaparse');
const fs = require('fs');
const models = require('../../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const file = await fs.readFileSync('ugm.csv', 'utf8');
    const csv = Papa.parse(file, { header: true, delimeter: ',' });
    const { data } = csv;
    const promises = data.map((r) => {
      if (r.UGM) {
        return queryInterface.sequelize.query(`
          UPDATE "Careers"
          SET "UgmId" = '${r.UGM}'
          WHERE id = ${parseInt(r.id)}
          `, {
          replacements: r,
        });
      }
    },
    );
    return Promise.all(promises);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
