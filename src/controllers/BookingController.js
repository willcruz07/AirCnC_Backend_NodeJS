const Booking = require("../models/Booking");

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date            
        });

        //Popular todos relacionamentos de spot e usuário para executar todas as informações, preenchendo
        //os dados de usuário e spot com cada um dos objetos
        // sabendo qual usuário criou uma reserva no spot.
        await booking.populate('spot').populate('user').execPopulate();

        return res.json(booking);
    }
}