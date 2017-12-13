const express = require('express');
const db = require('../database/db');
const models = require('../models');
const config = require('../../config/config.js');
const router = express.Router();
const params = require('../helpers/parameters')
const session = require('../helpers/session')


router.get('/users', (req, res, next) => {

});

router.post('/new', session.checkSuperadmin, (req, res, next) => {
  const { mail } = req.body;
  models.User.findOne({ where: { mail } })
    .then((user) => {
      if (user) {
        user.admin = true;
        user.save();
        res.status(201).json({ message: 'Nuevo admin creado' });
      }
      else {
        res.status(422).json({ message: 'Usuario no existe' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error' });
    });
});

router.get('/stats', session.checkAdmin, (req, res, next) => {
  const data = db.db_pond.any('SELECT "Careers".id as cId, "Universities".title as uTitle, \
  "Careers".title as cTitle, count(DISTINCT "Ponderations"."userId") as count \
  FROM "Universities", "Careers", "Ponderations" \
  WHERE "Universities".id = "Ponderations"."universityId"  \
  AND "Careers".id = "Ponderations"."careerId"  \
  GROUP BY cId, cTitle, uTitle;')
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error)=>{
      res.status(500).json({ error });
    });
  });


module.exports = router;
