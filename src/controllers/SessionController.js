// Padrões de métodos controllers MVC da comunidade.

// Index - Retorna uma lista de sessões
// Show - Retorna uma sessão
// Store - Cria uma sessão
// Update - Altera uma sessão
// Destroy - Destrói uma sessão

const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email });

        if(!user) {
            const user = await User.create({ email });        
        }

        return res.json(user);
    }
};