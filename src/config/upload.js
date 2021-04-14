const multer = require('multer');
const path = require('path');

// multer utilizado para fazer upload de arquivos como uma imagem, uma lib para o express para utilizar o tipo multpartforms
//multer.diskStorage para o local do dispositvo. o path.resolve pega o diretório acessando as barras
//de acordo com cada dispositvio ao invés de separar por / separamos por ','  

//storage é como o multer vai armazenar tudo, diskstorage é pra salvar no disco fisico do dispositivo
//path.resolve é o caminho para salvar os arquivos sem a necessidade de informar '/' 
// informamos __dirname para garantir que estamos partindo do arquivo local que esta chamando a função.
//finalename serve para informar qual vai ser o nome do arquivo, neste caso estamos passando o nome que ja
// esta no arquivo. 

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, callback) => {
            //pegando a extensão da imagem
            const ext = path.extname(file.originalname);
            //pegando o nome da imagem sem a extensão
            const name = path.basename(file.originalname, ext);

            callback(null, `${name}-${Date.now()}${ext}`);
        }
    })
}