var express = require('express');
var router = express.Router();
var db = require('../database/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({"message": "Nice try motherfucker"});
});

router.post('/', function(req, res, next) {
    res.json({"message": req.body});
});

module.exports = router;
