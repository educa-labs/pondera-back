const express = require('express');

const router = express.Router();
const parameters = require('parameters-middleware');
const { encryptPasswd } = require('../helpers/session');
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
router.post('/', userParams, (req, res) => {
  const { body } = req;
  const pswd = encryptPasswd(body.password);
  models.User.create({
    name: body.name,
    mail: body.mail,
    password_digest: pswd,
  }).then((data) => {
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

const controladorSheets = require('../controllers').google-sheets;

router.post('/test', userParams, (req, res, next) => {
  const jeison = req.body;
  const data = [jeison.name, jeison.mail, jeison.password];
  controladorSheets.uploadUser(data);
});

/* FIN DE RUTA DE PRUEBA */


function encryptPasswd(data) {
  return crypt.createHash('md5').update(data).digest('hex');
}

module.exports = router;

