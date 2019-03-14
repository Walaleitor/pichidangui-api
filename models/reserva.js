const mongoose = require('mongoose');

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
    this.model('Reserva').find({ estado: true, cabana: this.cabana }, (err, reservas) => {

        let fun = (reserva) => {
            return (this.inicio >= reserva.inicio && this.inicio <= reserva.final) || (this.final >= reserva.inicio && this.final <= reserva.final);
        };

        if (reservas.some(fun)) {
            const err = {
                ok: false,
                err: {
                    message: 'fechas ya ocupadas'
                }
            }
            next(err);
        } else {
            next();
        }
    })
});




module.exports = mongoose.model('Reserva', reservaSchema);