const express = require('express');
const router = express.Router();
const db = require('../database/db');
const parameters = require('../helpers/parameters');
const session = require('../helpers/session');
const model = require('../models')

/* Ponderaciones. */
const authHeader = parameters.permitHeaders(['authorization']);
const pondParams = parameters.permitParams(['NEM',
  'ranking',
  'language',
  'math',
  'history',
  'science',
  'cId']);
router.get('/', authHeader, session.checkSession, (req, res, next) => {
  res.json({ message: 'Nice try motherfucker' });
});

router.post('/', authHeader, session.checkSession, pondParams, (req, res, next) => {
  const { NEM, math, language, ranking, history, science, cId } = req.body;

  db.db_tuni.one('SELECT "NEM", ranking, language, math, science, history FROM weighings WHERE carreer_id = ${cId}', { cId })
    .then((data) => {
      for (var key in data){
        if(data[key] == null){
          data[key] = 0
        }
      };
      let ponderation = 0;
      ponderation += (NEM * data.NEM) + (math * data.math)
      + (language * data.language) + (science * data.science)
      + (history * data.history) + (ranking * data.ranking);
      ponderation /= 100;
      console.log(data)
      res.status(200).json({ ponderation });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
