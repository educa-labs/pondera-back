const express = require('express');
const db = require('../database/db');
const models = require('../models');
const config = require('../../config/config.js');
const params = require('../helpers/parameters');
const session = require('../helpers/session');
const excelGen = require('../helpers/excel');


const router = express.Router();


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
      } else {
        res.status(422).json({ message: 'Usuario no existe' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error' });
    });
});

router.get('/stats', session.checkAdmin, (req, res, next) => {
  const data = db.db_pond.any(`SELECT "Careers".id as cId, "Universities".title as uTitle, 
  "Careers".title as cTitle, count(DISTINCT "Ponderations"."userId") as count
  FROM "Universities", "Careers", "Ponderations"
  WHERE "Universities".id = "Ponderations"."universityId" 
  AND "Careers".id = "Ponderations"."careerId" 
  GROUP BY cId, cTitle, uTitle;`)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
});

router.get('/excel', session.checkAdmin, async (req, res, next) => {
  await excelGen('src/public/template.xlsx');
  res.status(200).json({ asd:"asd" });
  //res.status(200).sendFile("put some file here");
});

module.exports = router;
