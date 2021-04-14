const mongoose = require('mongoose');

//Criando o Schema para a criação dos Spot com imagem, nome da empresa, tecnologias, preço 
// Vinculando também o id usuário criado pelo mongodb e passando a referência user!
const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: String,
    techs: [String],
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    },
});

/** O SpotSchema.virtual cria uma nova propriedade dentro do schema para acessar novas informações
 * neste caso criamos uma nova propriedade com a url da imagem onde adicionamos a rota files, que ficou
 * referenciada como diretório estático do express fazendo link com nome o da imagem
 * sempre que o retorno for JSON é preciso adicionar o toJson ao final da criação do Schema new Mongoose
 */
 SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://localhost:3333/files/${this.thumbnail}`
 });

module.exports = mongoose.model('Spot', SpotSchema);