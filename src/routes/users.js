const express = require('express');

const router = express.Router();
const parameters = require('../helpers/parameters');
const { encryptPasswd, checkAdmin, checkSession, checkSuperadmin } = require('../helpers/session');
const models = require('../models');
const randomstring = require('randomstring');
const db = require('../database/db');

// In case of losing password
// randomstring.generate();

// ROUTES
/* CREATE new user */
const userParams = parameters.permitParams(['name', 'mail', 'password', 'rut', 'phone', 'regionId']);
router.post('/', userParams, parameters.validateUserParams, (req, res) => {
  const { body } = req;
  const pswd = encryptPasswd(body.password);
  models.User.create({
    name: body.name,
    mail: body.mail,
    password_digest: pswd,
    rut: body.rut,
    phone: body.phone,
    regionId: body.regionId,
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
      const field = obj.errors[0].path;
      const errors = {};
      errors[field] = 102;
      res.status(422).json({ errors });
    });
});

router.get('/count', (req, res, next) => {
  const data = db.db_pond.any('SELECT COUNT(DISTINCT rut) as count FROM "Users";')
    .then((data) => {
      res.status(200).json({ data });
    })

    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.get('/lostpassword', (req, res, next) => {
  const { mail } = req.query;
  const newPassword = randomstring.generate(8);
  const encryptedPassword = encryptPasswd(newPassword);

  models.User.findOne({ where: { mail } })
    .then((user) => {
      user.password_digest = encryptedPassword;
      user.save();
    })
    .catch((error) => {
      res.status(400).json({ message: 'Usuario no encontrado' });
      return;
    })

  res.mailer.send('password', {
    to: mail, // REQUIRED. This can be a comma delimited string just like a normal email to field. 
    subject: 'Nueva contraseña Pondera.cl', // REQUIRED.
    newPassword,
  }, (err) => {
    if (err) {
      // handle error
      console.log(err);
      res.status(400).json({ message: 'Ha ocurrido un error' });
      return;
    }
    res.status(200).json({ message: 'Email enviado' });
  });
});

router.post('/newpassword', checkSession, (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const currentPasswordDigest = encryptPasswd(currentPassword);

  const { user } = req;
  if (currentPasswordDigest === user.password_digest) {
    user.password_digest = encryptPasswd(newPassword);
    user.save();
    res.status(201).json({ message: 'Contraseña cambiada' });
  }
  else {
    res.status(401).json({ message: 'Contraseña incorrecta' });
  }
});

router.get('/all', checkSuperadmin, (req, res, next) => {
  db.db_pond.any('SELECT mail, phone FROM "Users";')
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});


module.exports = router;
