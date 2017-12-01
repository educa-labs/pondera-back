const express = require('express');

const router = express.Router();
const parameters = require('../helpers/parameters');
const { encryptPasswd } = require('../helpers/session');
const models = require('../models');
const randomstring = require('randomstring');

// In case of losing password
// randomstring.generate();

// ROUTES
/* CREATE new user */
const userParams = parameters.permitParams(['name', 'mail', 'password', 'rut', 'phone', 'regionId']);
router.post('/', userParams, (req, res) => {
  const { body } = req;
  const pswd = encryptPasswd(body.password);
  parameters.validateName(body.name);
  models.User.create({
    name: body.name,
    mail: body.mail,
    password_digest: pswd,
    rut: body.rut,
    phone: body.phone,
    region: body.regionId,
    token: randomstring.generate(),
  }).then((data) => {
    res.status(200)
      .json({
        message: 'Usuario creado correctamente',
        token: data.token,
      });
  })
    .catch((obj) => {
      console.log(obj);
      res.json({ message: 'could not create User' });
    });
});


/* RUTA DE PRUEBA: ruta para testear el modulo de google-sheets */


// const controladorSheets = require('../controllers').google-sheets;


// router.post('/test', userParams, (req, res, next) => {
//   const jeison = req.body;
//   const data = [jeison.name, jeison.mail, jeison.password];
//   controladorSheets.uploadUser(data);
// });

/* FIN DE RUTA DE PRUEBA */
module.exports = router;
