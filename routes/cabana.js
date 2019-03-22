const express = require('express');
const Cabana = require('../models/cabana');
const _ = require('underscore');
const { verificaToken } = require('../middlewares/auth');

const router = express.Router();



router.post('/cabana', verificaToken, (req, res) => {
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

router.get('/cabana', verificaToken, (req, res) => {
    Cabana.find({ estado: true }, (err, cabanas) => {
        if (err) {
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


router.put('/cabana/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion', 'capacidad'])
    Cabana.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, cabana) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            cabana
        });


    })
})

router.delete('/cabana/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Cabana.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, cabana) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            cabana,
            menssage: 'La cabaña ha sido borrada'
        });


    })
})

module.exports = router;