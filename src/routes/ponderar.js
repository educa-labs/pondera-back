const express = require('express');

const router = express.Router();
const db = require('../database/db');
const parameters = require('../helpers/parameters');
const session = require('../helpers/session');
const models = require('../models');
const rp = require('request-promise');
const { similarCareers } = require('../helpers/careers');

/* Ponderaciones. */
const authHeader = parameters.permitHeaders(['authorization']);
const pondParams = parameters.permitParams(['NEM',
  'ranking',
  'language',
  'math',
  'history',
  'science',
  'cId']);
router.get('/similar/:cId', (req, res, next) => {
  const { cId } = req.params;
  similarCareers(cId)
    .then((sim) => {
      res.status(200).json({
        sim,
      });
    });
});

router.post('/', authHeader, session.checkSession, pondParams, (req, res, next) => {
  const {
    NEM, math, language, ranking, history, science, cId, uId,
  } = req.body;

  db.db_tuni.one('SELECT "NEM", ranking, language, math, science, history, last_cut as "lastCut" \
  FROM weighings,carreers WHERE carreer_id = ${cId} AND carreers.id = weighings.carreer_id', { cId })
    .then((data) => {
      for (const key in data) {
        if (data[key] == null) {
          data[key] = 0;
        }
      }
      // Calcular ponderacion
      let pond = 0;
      pond += (NEM * data.NEM) + (math * data.math)
        + (language * data.language) + (science * data.science)
        + (history * data.history) + (ranking * data.ranking);
      pond /= 100;
      // Ordenar datos de ponderacion
      const weights = {
        NEM: data.NEM,
        math: data.math,
        language: data.language,
        science: data.science,
        history: data.history,
        ranking: data.ranking,
      };
      // Carreras similares by Newton
      // const similar = similarCareers(cId);
      // Titles de carrera y universidad
      const diff = pond - data.lastCut;
      models.Ponderation.create({
        value: pond,
        careerId: cId,
        universityId: uId,
        userId: req.user.id,
        NEM,
        math,
        language,
        science,
        history,
        ranking,
      }).then(() => { })
        .catch((obj) => {
          console.log(obj);
          // res.status(422).json({ message: 'no se pudo crear la ponderacion' });
        });
      res.status(200).json({
        pond, weights, cut: data.lastCut, diff,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});
module.exports = router;
