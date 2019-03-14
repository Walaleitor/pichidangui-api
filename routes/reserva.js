const express = require('express');
const Reserva = require('../models/reserva');
const _ = require('underscore');


const router = express.Router();




router.post('/reserva', (req, res) => {
    let body = req.body;
    let cabana = req.query.cabana;
    let arrendatario = req.query.arrendatario;

    let reserva = new Reserva({
        cabana,
        arrendatario,
        inicio: new Date(body.inicio),
        final: new Date(body.final),
    })

    reserva.save((err, reservaNueva) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            reserva: reservaNueva
        });
    })

});


module.exports = router;