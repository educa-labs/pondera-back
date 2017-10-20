var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({users: [{name: 'Timmy'}]});
});

router.get('/hielo', function(req, res, next){
  res.json({"hielo": "hielooooo"})
});

module.exports = router;
