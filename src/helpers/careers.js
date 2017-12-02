const db = require('../database/db');
const rp = require('request-promise');

async function similarCareers(cId) {
  cId = parseInt(cId, 10);
  const options = {
    method: 'POST',
    uri: 'http://newton.tuniversidad.cl/get_nn',
    body: {
      k: 4,
      carreers: [cId],
    },
    json: true, // Automatically stringifies the body to JSON
  };
  let ids;
  let id1;
  let id2;
  let id3;
  await rp(options)
    .then((parsedBody) => {
      let simIds = [];
      ids = parsedBody.result['0'];
      ids.forEach((id) => {
        if (id !== cId) {
          simIds.push(id);
        }
      });
      [id1, id2, id3] = simIds;
    })
    .catch((err) => {
    });
  let carreras = [];
  await db.db_tuni.any('SELECT carreers.id as "cId", universities.id as "uId", \
  carreers.title as "cTitle", universities.initials as "uInitials" \
  FROM carreers,universities \
  WHERE universities.id = carreers.university_id \
  AND (carreers.id = ${id1} OR carreers.id = ${id2} OR carreers.id = ${id3})', { id1, id2, id3 })
    .then((data) => {
      carreras = data;
    })
    .catch((err) => {
    });
  return carreras;
}

module.exports = { similarCareers };

