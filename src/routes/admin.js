const express = require('express');
const db = require('../database/db');
const models = require('../models');
const config = require('../../config/config.js');
const params = require('../helpers/parameters');
const session = require('../helpers/session');
const { excelGen, csvGen } = require('../helpers/excel');
const path = require('path');

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
  db.db_pond.any('SELECT "Careers".id as cId, "Universities".title as uTitle, \
  "Careers".title as cTitle, "Universities".id as uId, count(DISTINCT "Ponderations"."userId") as count \
  FROM "Universities", "Careers", "Ponderations" \
  WHERE "Universities".id = "Ponderations"."universityId"  \
  AND "Careers".id = "Ponderations"."careerId"  \
  GROUP BY cId, cTitle, uTitle, uId;')
    .then((data) => {
      res.status(200).json({ data });
    })

    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
});

router.get('/excel', session.checkAdminQuery, async (req, res, next) => {
  if (true) {
    await csvGen('./src/public/ponderaciones_ugm.csv', true);
    res.status(200).sendFile(path.resolve('src/public/ponderaciones_ugm.csv'));
  } else {
    await csvGen(`./src/public/ponderaciones ${req.user.name}.csv`);
    res.status(200).sendFile(path.resolve(`src/public/ponderaciones ${req.user.name}.csv`));
  }
});

router.post('/ugmid', session.checkSuperadmin, (req, res, next) => {
  const { id, ugmId } = req.body;
  models.Career.findOne({ where: { id } })
    .then((career) => {
      if (career) {
        career.UgmId = true;
        career.save();
        console.log(career);
        res.status(201).json({ message: 'Id de ugm cambiado' });
      } else {
        res.status(422).json({ message: 'Carrera no existe' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error' });
    });
});

router.post('/newcareer', session.checkSuperadmin, (req, res, next) => {
  const { id } = req.body;
  db.db_tuni.any('SELECT title \
  FROM carreers \
  WHERE id =${id} \
  ', { id })
    .then((data) => {
      const { title } = data[0];
      models.Career.create({ 
        id,
        title,
      })
        .then((career) => {
          if (career) {
            console.log(career);
            res.status(201).json({ message: 'Nueva carrera importada' });
          } else {
            res.status(422).json({ message: 'Carrera ya existe, use /sync' });
          }
        })
        .catch((error) => {
          model.Career.update({ where: id })
          res.status(500).json({ message: 'Error' });
        });
    })
});

router.post('/sync', session.checkSuperadmin, (req, res, next) => {
  const { id } = req.body;
  db.db_tuni.any('SELECT title \
  FROM carreers \
  WHERE id =${id} \
  ', { id })
    .then((data) => {
      const { title } = data[0];
      console.log(data[0]);
      models.Career.findOne({ where: { id } })
        .then((career) => {
          if (career) {
            career.title = title;
            console.log(career);
            res.status(201).json({ message: 'Carrera sincronizada' });
          } else {
            res.status(422).json({ message: 'Carrera no existe' });
          }
        })
        .catch((error) => {
          model.Career.update({ where: id })
          res.status(500).json({ message: 'Error' });
        });
    })
});

module.exports = router;
