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
      const simIds = [];
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

async function sendMbo(user, body, idOptativa, ponderation) {
  let optativa;
  switch (idOptativa) {
    case 1:
      optativa = body.science;
      break;
    case 2:
      optativa = body.history;
      break;
  }

  const options = {
    method: 'POST',
    uri: 'http://190.96.47.75:80/api/Psu/Insert',
    body: {
      nombre: user.name,
      mail: user.mail,
      rut: user.rut,
      region: user.regionId,
      telefono: user.phone,
      nem: parseInt(body.NEM, 10),
      ranking: parseInt(body.ranking, 10),
      matematicas: parseInt(body.math, 10),
      lenguaje: parseInt(body.language, 10),
      optativa: parseInt(optativa, 10),
      idOptativa,
      ponderacion: Math.round(ponderation),
      carrera: parseInt(body.cId, 10),
      hora: new Date(),
    },
    json: true, // Automatically stringifies the body to JSON
  };
  console.log(options.body);
  rp(options)
    .then((parsedBody) => {
      console.log(parsedBody);
    })
    .catch((error)=>{
      console.log(error);
    });
}

module.exports = { similarCareers, sendMbo };

