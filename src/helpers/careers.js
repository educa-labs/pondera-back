const db = require('../database/db');
const rp = require('request-promise');

async function similarCareers(cId) {
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
  let id1;
  let id2;
  let id3;
  console.log('HOLA');
  await rp(options)
    .then((parsedBody) => {
      ids = parsedBody.result['0'];
      [id1, id2, id3] = ids;
    })
    .catch((err) => {
      
    });
  let carreras = {};
  await db.db_tuni.any(`SELECT carreers.id as "cId", universities.id as "uId", 
  carreers.title as "careerTitle", universities.initials as "universityInitials" 
  FROM carreers,universities
  WHERE universities.id = carreers.university_id
  AND (carreers.id = ${id1} OR carreers.id = ${id2} OR carreers.id = ${id3})`, { id1, id2, id3 })
    .then((data) => {
      carreras = data;
    })
    .catch((err) => {
      console.log(err);
      return 'Error';
    });
  return carreras;
}

module.exports = { similarCareers };
