const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');



const router = express.Router();

router.post('/usuario', (req, res) => {
    let body = req.body;
    console.log(body.password);

    let usuario = new Usuario({
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    })

    usuario.save((err, usuarioNuevo) => {
        if (err) {
            return res.sendStatus(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioNuevo
        });




    })

});






module.exports = router;