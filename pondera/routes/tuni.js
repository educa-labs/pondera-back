var express = require('express');
var router = express.Router();
var db = require('../database/db');

router.get('/universidades', function(req, res, next) {
    db.any("SELECT universities.id, institutions.title FROM universities,institutions LIMIT 1")
    .then(function(data){
        res.status(200)
        .json({
            "data": data
        })
    });
});

router.get('/universidades/:id/carreras', function(req, res, next) {
    var id = req.params.id;
    db.any("SELECT carreers.id, carreers.title FROM carreers,universities WHERE universities.id=${id} AND carreers.university_id = universities.id;", {"id": id})
    .then(function(data){
        res.status(200)
        .json({
            "data": data
        })
    });
});

module.exports = router;
