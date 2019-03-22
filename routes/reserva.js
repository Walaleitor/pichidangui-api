const express = require('express');
const Reserva = require('../models/reserva');
const _ = require('underscore');
const { verificaToken } = require('../middlewares/auth');


const router = express.Router();


router.post('/reserva', verificaToken, (req, res) => {
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

router.get('/reserva', verificaToken, (req, res) => {
    Reserva.find({ estado: true }, (err, reservas) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            reservas
        })

    })


})

router.delete('reserva/:id', verificaToken, (req, res) => {
    Reserva.findOneAndUpdate({ estado: false }, { new: true }, (err, reserva) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            reserva,
            menssage: 'La reserva ha sido borrada'
        });
    });
});


module.exports = router;