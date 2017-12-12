const express = require('express');

const router = express.Router();
const db = require('../database/db');
const parameters = require('../helpers/parameters');
const session = require('../helpers/session');
const models = require('../models');
const rp = require('request-promise');
const { similarCareers, sendMbo } = require('../helpers/careers');

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
  let {
    NEM, math, language, ranking, history, science, cId, uId,
  } = req.body;

  db.db_tuni.one('SELECT "NEM", ranking, language, math, science, history, last_cut as "lastCut" \
  FROM weighings,carreers WHERE carreer_id = ${cId} AND carreers.id = weighings.carreer_id', { cId })
    .then((data) => {
      // Verificar prueba correcta
      if (data.science !== null || data.history !== null) {
        if (data.science === null && science !== '') {
          res.status(422).json({ message: 'Esta carrera pondera con historia' });
          return;
        }
        else if (data.history === null && history !== '') {
          res.status(422).json({ message: 'Esta carrera pondera con ciencias' });
          return;
        }
      }
      // Get idOptativa
      let idOptativa;
      if (science == '') {
        idOptativa = 2;
      }
      else {
        idOptativa = 1;
      }

      for (let key in data){
        if(data[key] == null){
          data[key] = 0
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
      if (science === '') {
        science = '0';
      }
      if (history === '') {
        history = '0';
      }
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
      }).then(() => {
        sendMbo(req.user, req.body, idOptativa, pond);
        res.status(200).json({
          pond, weights, cut: data.lastCut, diff,
        });
      })
        .catch((obj) => {
          console.log(obj);
          res.status(422).json({ message: 'no se pudo crear la ponderacion' });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});
module.exports = router;
