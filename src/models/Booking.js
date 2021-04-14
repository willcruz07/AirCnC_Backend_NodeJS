const mongoose = require('mongoose');

//Criando uma reserva informando a data da reserva, criando o relacionamento da reserva com o usuário 
// e o spot da reserva.

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);