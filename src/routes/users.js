const express = require('express');

const router = express.Router();
const parameters = require('parameters-middleware');
const db = require('../database/db');
const crypt = require('crypto');
const randomstring = require('randomstring');
const models = require('../models');

// In case of losing password
// randomstring.generate();

// Parameters
function getMessage(missing) {
  return `Missing params: ${missing.join(', ')}`;
}

const userParams = parameters(
  {
    body: ['name', 'mail',
      'password', 'rut', 'phone', 'city'],
  },
  { message: getMessage },
  { statusCode: 400 }
);

// ROUTES
/* CREATE new user */
router.post('/', userParams, (req, res, next) => {
  const j = req.body;
  const pswd = encryptPasswd(j.password);
  models.User.create({ name: j.name, mail: j.mail, password_digest: pswd }).then((data) => {
    res.status(200)
      .json({
        message: 'Usuario creado correctamente',
        data,
      });
  })
    .catch((obj) => {
      console.log(obj);
      res.json({ message: 'could not create User' });
    });
});



/* RUTA DE PRUEBA: ruta para testear el modulo de google-sheets */

const controlador_sheets = require('../controllers').google-sheets;

router.post('/test', userParams, (req, res, next) => {
  const jeison = req.body;
  const data_a_guardar = [jeison.name, jeison.mail, jeison.password];
  controlador_sheets.subir_usuario(data_a_guardar);
});

/* FIN DE RUTA DE PRUEBA */


function encryptPasswd(data) {
  return crypt.createHash('md5').update(data).digest('hex');
}


module.exports = router;

