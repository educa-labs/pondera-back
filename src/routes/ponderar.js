const express = require('express');

const router = express.Router();
const db = require('../database/db');
const parameters = require('parameters-middleware');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({ message: 'Nice try motherfucker' });
});

router.post('/', (req, res, next) => {
  res.json({ message: req.body });
});

module.exports = router;
