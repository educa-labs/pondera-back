var express = require('express');
var router = express.Router();
var db = require('../database/db');
var randomstring = require("randomstring");
var parameters = require('parameters-middleware');
var crypt = require('crypto');

// randomstring.generate();
// Parameters requirements
function getMessage(missing) {
  return 'Missing params: ' + missing.join(', ');
}
var loginParams = parameters({body: ["mail", "password"]},
{message: getMessage},
{statusCode: 400}
)


/* Login. */
router.post('/', loginParams, function(req, res, next) {
  var j = req.body;
  var paswd = encryptPasswd(j.password);
  db.db_pond.one(`SELECT password_digest FROM Users WHERE mail=$1;
                `, [j.mail])
  .then(function(data){
      // Comprobar password
      if (data.password_digest == paswd){
        // Generar nuevo token
        var new_token = randomstring.generate();
        db.db_pond.one(`UPDATE Users 
                        SET token = $1 
                        WHERE mail = $2`, [new_token, j.mail])
        .success(function(data){
          // Mail y password correctos
          res.status(201).json({"message": "Sesión creada correctamente"});
          return
        })
      }
      else{
        res.status(401).json({"message": "Credenciales invalidas"});
        return
      }
  })
  .catch(function(obj){
    res.status(401).json({"message": "Credenciales invalidas"});
    return
  });
});


// Obtener datos de usuario loggeado
router.get('/', function(req, res, next) {
  res.status(400).json({"Message": "Not implemented"})
})




function encryptPasswd(data) {
  return crypt.createHash('md5').update(data).digest('hex');
}

module.exports = router;
