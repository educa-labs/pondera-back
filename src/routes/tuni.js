const express = require('express');

const router = express.Router();
const db = require('../database/db');
const parameters = require('../helpers/parameters');
const session = require('../helpers/session');

const authHeader = parameters.permitHeaders(['authorization']);

router.get('/universities', authHeader, session.checkSession, (req, res, next) => {
  db.db_tuni.any('SELECT universities.id, institutions.title FROM universities,institutions WHERE institutions.id = universities.institution_id ORDER BY institutions.title ASC')
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'Universidad no encontrada' });
        return;
      }
      res.status(200)
        .json({
          data,
        });
    });
});

router.get('/universities/:id/careers', authHeader, session.checkSession, (req, res, next) => {
  const { id } = req.params;
  db.db_tuni.any('SELECT carreers.id, carreers.title FROM carreers,universities WHERE universities.id=${id} AND carreers.university_id = universities.id ORDER BY carreers.title ASC;', { id })
    .then((data) => {
      res.status(200)
        .json({
          data,
        });
    });
});

module.exports = router;
