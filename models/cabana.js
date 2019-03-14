const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


let Schema = mongoose.Schema;

let cabanaSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, 'El descripcion es necesario']
    },
    estado: {
        type: Boolean,
        default: true
    },
    capacidad: {
        type: Number,
        required: [true, 'La capacidad de la cabaña es necesaria']
    }
});


module.exports = mongoose.model('Cabana', cabanaSchema);