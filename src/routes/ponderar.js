const express = require('express');

const router = express.Router();
const db = require('../database/db');
const parameters = require('parameters-middleware');
const session = require('../helpers/session');

/* GET users listing. */
router.get('/', session.checkSession, (req, res, next) => {
  res.json({ message: 'Nice try motherfucker' });
});

router.post('/', session.checkSession, (req, res, next) => {
  res.json({ message: req.body });
});

module.exports = router;
