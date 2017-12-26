const express = require('express');
const db = require('../database/db');
const models = require('../models');
const config = require('../../config/config.js');
const params = require('../helpers/parameters');
const session = require('../helpers/session');
const excel = require('../helpers/excel');
const path = require('path');

const router = express.Router();


router.get('/users', (req, res, next) => {

});

router.post('/new', session.checkSuperadmin, (req, res, next) => {
  const { mail, type } = req.body;
  models.User.findOne({ where: { mail } })
    .then((user) => {
      if (user) {
        user.admin = true;
        if (type === 'ugm') {
          user.ugm = true;
        } else if (type === 'ucen') {
          user.ucen = true;
        }
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
  res.status(200).sendFile(path.resolve(`src/public/ponderaciones_ugm.xlsx`));
});

router.get('/exceld', async (req, res, next) => {
  if (true) {
    excel.excelGen('src/public/template_ugm.xlsx', `./src/public/ponderaciones_ugm.xlsx`, true);
  } else {
    excel.excelGen('src/public/template.xlsx', `./src/public/ponderaciones_ucen.xlsx`);
  }
  res.status(200).json({ message: 'Creando excel' });
});

router.get('/excelucen', session.checkAdminQuery, async (req, res, next) => {
  // await excel.excelUcen('src/public/template_ucen.xlsx', `./src/public/ponderaciones_ucen1.csv`);
  res.status(200).sendFile(path.resolve(`src/public/ponderaciones_ucen1.csv`));
});


router.get('/excelucen2', session.checkAdminQuery, async (req, res, next) => {
  // await excel.excelUcen2('src/public/template_ugm.xlsx', `./src/public/ponderaciones_ucen2.csv`);
  res.status(200).sendFile(path.resolve(`src/public/ponderaciones_ucen2.csv`));
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
