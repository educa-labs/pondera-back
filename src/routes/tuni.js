const express = require('express');

const router = express.Router();
const db = require('../database/db');

router.get('/universidades', (req, res, next) => {
  db.db_tuni.any('SELECT universities.id, institutions.title FROM universities,institutions LIMIT 1')
    .then((data) => {
      res.status(200)
        .json({
          data,
        });
    });
});

router.get('/universidades/:id/carreras', (req, res, next) => {
  const { id } = req.params;
  db.db_tuni.any('SELECT carreers.id, carreers.title FROM carreers,universities WHERE universities.id=${id} AND carreers.university_id = universities.id;', { id })
    .then((data) => {
      res.status(200)
        .json({
          data,
        });
    });
});

module.exports = router;
