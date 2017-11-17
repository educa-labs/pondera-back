const express = require('express');
const models = require('../models');

const router = express.Router();


router.get('/', (req, res) => {
  models.Region.findAll({})
    .then((data) => {
      res.status(200).json({ regions: data });
    });
});

module.exports = router;
