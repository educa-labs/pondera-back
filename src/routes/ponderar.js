const express = require('express');

const router = express.Router();
const db = require('../database/db');
const parameters = require('../helpers/parameters');
const session = require('../helpers/session');

/* Ponderaciones. */
const authHeader = parameters.permitHeaders(['authorization'])
router.get('/', authHeader, session.checkSession, (req, res, next) => {
  res.json({ message: 'Nice try motherfucker' });
});

router.post('/', authHeader, session.checkSession, (req, res, next) => {
  res.json({ message: req.body });
});

module.exports = router;
