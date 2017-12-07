const express = require('express');
const db = require('../database/db');
const models = require('../models');
const config = require('../../config/config.js');
const router = express.Router();


router.get('/users', (req, res, next) => {

});

router.get('/session', (req, res, next) => {
  
});

router.get('/users', (req, res, next) => {

});

router.get('/stats', (req, res, next) => {
  const data = db.db_pond.any(`SELECT "Careers".id as cId, "Universities".title as uTitle, 
  "Careers".title as cTitle, count(DISTINCT "Ponderations"."userId") as count
  FROM "Universities", "Careers", "Ponderations"
  WHERE "Universities".id = "Ponderations"."universityId" 
  AND "Careers".id = "Ponderations"."careerId" 
  GROUP BY cId, cTitle, uTitle;`)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error)=>{
      console.log(error);
      res.status(500).json({ error });
    });
  });


module.exports = router;
