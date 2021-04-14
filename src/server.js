const express = require("express");
const mongoose = require('mongoose');
/* o cors restringe para que somente o endereço especifico possa consumir a api*/ 
const cors = require('cors');
const path = require('path');
const http = require('http');

const app = express();
const routes = require('./routes');

const serverHttp = http.Server(app);
const io = require("socket.io")(serverHttp, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Access-Control-Allow-Methods", "Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept"],
        credentials: true
    }
});

io.on('connection', socket => {
    console.log('Conectado', socket.id);
});


/* 
Criado conexão com o MongoDB pelo site  - mongodb.com/atlas realizado toda config de clusters
copiado a url de conexão para o connect
*/
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack.7dxqk.mongodb.net/omnistackdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true    
});
/* aqui é possivel definir dentro da função cors qual endereço pode consumir a api vazio diz q qlqr um pode*/

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);


serverHttp.listen(3333);






