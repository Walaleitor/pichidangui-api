const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validatorRut = require('rut.js');

let Schema = mongoose.Schema;


let arrendatarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    rut: {
        type: String,
        required: [true, 'El rut es necesario'],
        validate: {
            validator: function(v) {
                return validatorRut.validate(v);
            },
            message: props => `${props.value} is not a valid Rut`
        },
        unique: true
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        validate: {
            validator: function(email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            message: props => `${props.value} is not a valid Email`
        },
        unique: true
    },
    estado: {
        type: Boolean,
        default: true
    }

});


arrendatarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('Arrendatario', arrendatarioSchema);