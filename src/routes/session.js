const express = require('express');

const router = express.Router();
const randomstring = require('randomstring');
const parameters = require('parameters-middleware');
const { encryptPasswd } = require('../helpers/session');
const models = require('../models');

// randomstring.generate();
// Parameters requirements
function getMessage(missing) {
  return `Missing params: ${missing.join(', ')}`;
}
const loginParams = parameters(
  { body: ['mail', 'password'] },
  { message: getMessage },
  { statusCode: 400 }
);


/* Login. */
router.post('/', loginParams, (req, res) => {
  const { body } = req;
  const paswd = encryptPasswd(body.password);
  models.User.findOne({ where: { mail: body.mail } })
    .then((data) => {
      // Comprobar password
      if (data.password_digest === paswd) {
        // Generar nuevo token
        const newToken = randomstring.generate();
        data.token = newToken;
        data.save();
        res.status(201).json({ message: 'Sesión creada correctamente', token: newToken });
      } else {
        res.status(401).json({ message: 'Credenciales invalidas' });
      }
    }).catch((obj) => {
      console.log(obj);
      res.status(401).json({ message: 'Credenciales invalidas' });
    });
});


// Obtener datos de usuario loggeado
router.get('/', (req, res, next) => {
  res.status(400).json({ Message: 'Not implemented' });
});
module.exports = router;
