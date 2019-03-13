const express = require('express');
const app = express();


app.use(require('./arrendatario'));
app.use(require('./cabana'))


module.exports = app;