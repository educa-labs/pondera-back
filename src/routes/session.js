const express = require('express');

const router = express.Router();
const db = require('../database/db');
const randomstring = require('randomstring');
const parameters = require('parameters-middleware');
const crypt = require('crypto');

// randomstring.generate();
// Parameters requirements
function getMessage(missing) {
  return `Missing params: ${missing.join(', ')}`;
}
const loginParams = parameters(
  { body: ['mail', 'password'] },
  { message: getMessage },
  { statusCode: 400 },
);


/* Login. */
router.post('/', loginParams, (req, res, next) => {
  const j = req.body;
  const paswd = encryptPasswd(j.password);
  db.db_pond.one(`SELECT password_digest FROM Users WHERE mail=$1;
                `, [j.mail])
    .then((data) => {
      // Comprobar password
      if (data.password_digest == paswd) {
        // Generar nuevo token
        const new_token = randomstring.generate();
        db.db_pond.one(`UPDATE Users 
                        SET token = $1 
                        WHERE mail = $2`, [new_token, j.mail])
          .success((data) => {
          // Mail y password correctos
            res.status(201).json({ message: 'Sesión creada correctamente' });
          });
      } else {
        res.status(401).json({ message: 'Credenciales invalidas' });
      }
    })
    .catch((obj) => {
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
