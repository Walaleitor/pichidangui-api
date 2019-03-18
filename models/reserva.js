const mongoose = require('mongoose');
const { reservaMenorAHoy } = require('../utils/reserva')

let Schema = mongoose.Schema;

let reservaSchema = new Schema({
    arrendatario: {
        type: Schema.Types.ObjectId,
        ref: 'Arrendatario',
        require: true,
    },
    cabana: {
        type: Schema.Types.ObjectId,
        ref: 'Cabana',
        require: true,
    },
    inicio: {
        type: Date,
        required: [true, 'La fecha de inicio es necesario'],

    },
    final: {
        type: Date,
        required: [true, 'La fecha de fin es necesaria'],
    },
    estado: {
        type: Boolean,
        default: true
    }
});



reservaSchema.pre('save', function(next) {

    if (reservaMenorAHoy(this.inicio)) {
        let err = {
            ok: false,
            err: {
                message: 'La fecha de inicio no puede ser anterior a hoy'
            }
        }
        return next(err);
    }

    if (this.inicio.getTime() == this.final.getTime()) {

        let err = {
            ok: false,
            err: {
                message: 'La fecha de inicio no puede ser la misma que la de fin'
            }
        }
        return next(err);

    } else if (this.final < this.inicio) {

        let err = {
            ok: false,
            err: {
                message: 'La fecha de fin no puede ser anterior a la de fin'
            }
        }
        return next(err);

    }

    this.model('Reserva').find({ estado: true, cabana: this.cabana }, (err, reservas) => {

        let fun = (reserva) => {
            return (this.inicio > reserva.inicio && this.inicio < reserva.final) || (this.final >= reserva.inicio && this.final <= reserva.final);
        };

        if (reservas.some(fun)) {
            let err = {
                ok: false,
                err: {
                    message: 'fechas ya ocupadas'
                }
            }
            return next(err);
        } else {
            next();
        }
    })
});




module.exports = mongoose.model('Reserva', reservaSchema);