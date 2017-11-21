const express = require('express');
const models = require('../models');
const serializer = require('../serializers/regionSerializer');

const router = express.Router();


router.get('/', (req, res) => {
  models.Region.findAll({})
    .then((data) => {
      res.status(200).json(serializer.serialize(data));
    });
});

module.exports = router;
