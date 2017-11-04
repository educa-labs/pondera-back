var express = require('express');
var router = express.Router();
var parameters = require('parameters-middleware');
var db = require('../database/db');
var crypt = require('crypto');
var randomstring = require("randomstring");

// In case of losing password
// randomstring.generate();

// Parameters
function getMessage(missing) {
  return 'Missing params: ' + missing.join(', ');
}

var userParams = parameters({body: ["name", "mail", 
"password", "rut", "phone", "city"]},
{message: getMessage},
{statusCode: 400}
)

// ROUTES
/* CREATE new user */
router.post('/', userParams, function(req, res, next) {
  var j = req.body
  var pswd = encryptPasswd(j.password)
  db.db_pond.one(`INSERT INTO
                  Users(name, mail, password_digest,
                  rut, phone, city)
                  VALUES($1, $2, $3, $4, $5, $6) RETURNING id, password_digest;  
                  `, [j.name, j.mail, pswd, j.rut, j.phone, j.city])
  .then(function(data){
      res.status(200)
      .json({
          "message": "Usuario creado correctamente",
          "data": data
      })
  })
  .catch(function(obj){
    res.json({"message": "hola"})
  });
});






function encryptPasswd(data) {
  return crypt.createHash('md5').update(data).digest('hex');
}


module.exports = router;

