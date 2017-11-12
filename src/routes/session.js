const express = require('express');

const router = express.Router();
const db = require('../database/db');
const randomstring = require('randomstring');
const parameters = require('parameters-middleware');
const crypt = require('crypto');
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
router.post('/', loginParams, (req, res, next) => {
  const j = req.body;
  const paswd = encryptPasswd(j.password);
  models.User.findOne({ where: { mail: j.mail } }).then((data) => {
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


function encryptPasswd(data) {
  return crypt.createHash('md5').update(data).digest('hex');
}

module.exports = router;
