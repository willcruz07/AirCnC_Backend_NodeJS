const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    async store(req, res) {
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User does not exists' });
        }

// realizando criação do spot no banco. Passando todas as informações coletadas. cuidando apenas do
// filename que pegamos no req.file, user_id vindo do header e as techs
// onde a informação do banco espera um array e aqui estamos passando como string. 
// sendo assim vai ser preciso utilizar um split para verificar as ',' em seguidas realizando um map
// para percorrer toda a string e em seguida um trim() para remover os espaços em branco se houver.         

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename, 
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price            
        });

        return res.json(spot);
    }
};
