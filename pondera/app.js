var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// Modulos de rutas
var users = require('./routes/users');
var ponderar = require('./routes/ponderar');
var tuni = require('./routes/tuni');

// Iniciar Aplicacion
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Usar rutas
app.use('/api/v1/users', users);
app.use('/api/v1/ponderar', ponderar);
app.use('/api/v1/tuni', tuni);

module.exports = app;
