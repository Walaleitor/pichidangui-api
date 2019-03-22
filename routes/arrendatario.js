const express = require('express');
const Arrendatario = require('../models/arrendatario');
const { format, clean } = require('rut.js');
const _ = require('underscore');

const router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.post('/arrendatario', (req, res) => {
    let body = req.body;
    let arrendatario = new Arrendatario({
        nombre: body.nombre,
        rut: format(body.rut),
        email: body.email
    });

    arrendatario.save((err, arrendatarioNuevo) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        console.log(`Arrendatario Creado: ${arrendatarioNuevo}`);
        res.json({
            ok: true,
            arrendatario: arrendatarioNuevo
        });

    });
});

router.get('/arrendatario', (req, res) => {
    Arrendatario.find({ estado: true })
        .exec((err, arrendatarios) => {
            if (err) {

                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!arrendatarios) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                arrendatarios
            });
        });
});

router.put('/arrendatario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'rut']);
    Arrendatario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, arrendatario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            arrendatario
        })
    });
});

router.delete('/arrendatario/:id', (req, res) => {
    let id = req.params.id;
    Arrendatario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, arrendatario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            arrendatario,
            message: 'El arrendatario ha sido borrado'
        })
    });
});



module.exports = router;