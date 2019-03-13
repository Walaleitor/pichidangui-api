const express = require('express');
const Cabana = require('../models/cabana');
const _ = require('underscore');

const router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


router.post('/cabana', (req, res) => {
    let body = req.body;
    let cabana = new Cabana({
        descripcion: body.descripcion,
        capacidad: body.capacidad
    })

    cabana.save((err, cabanaNueva) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        console.log(`Cabaña creada: ${cabanaNueva}`);
        res.json({
            ok: true,
            cabana: cabanaNueva
        })
    })
})

router.get('/cabana', (req, res) => {
    Cabana.find({ estado: true }, (err, cabanas) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!cabanas) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            cabanas
        });
    });
});


router.put('/cabana/:id', (req, res) => {

})

module.exports = router;