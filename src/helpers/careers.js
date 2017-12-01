const db = require('../database/db');
const rp = require('request-promise');

function similarCareers(cId) {
  const options = {
    method: 'POST',
    uri: 'http://newton.tuniversidad.cl/get_nn',
    body: {
      k: 3,
      carreers: [cId],
    },
    json: true, // Automatically stringifies the body to JSON
  };
  let ids;
  const a = rp(options)
    .then((parsedBody) => {
      ids = parsedBody.result['0'];
      const [id1, id2, id3] = ids;
      db.db_tuni.any('SELECT carreers.id, carreers.title FROM carreers WHERE id = ${id1} OR id = ${id2} OR id = ${id3}', { id1, id2, id3 })
        .then(data => data)
        .catch(err => 'Error');
    })
    .catch((err) => {
      ids = ['error'];
    });
}

module.exports = { similarCareers };
