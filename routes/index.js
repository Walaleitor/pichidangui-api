const express = require('express');
const app = express();


app.use(require('./arrendatario'));
app.use(require('./cabana'));
app.use(require('./reserva'));
app.use(require('./usuario'));


module.exports = app;