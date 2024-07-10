var express = require('express');
var router = express.Router();
const { getFtpConnection } = require('../helpers');
const fs = require('fs');

/* VIEW ENDPOINTS */
// GET images page
router.get('/', async (req, res, next) => {

  // pega a conexão ftp
  const client = await getFtpConnection();
  // await client.downloadToDir("public/images/", "/");

  // inicia a lista de imagens vazia
  let image_list = [];
  
  // pega a lista de imagens que tem no ftp
  var list = await client.list();

  // passa cada imagem do ftp
  for (let i = 0; i < list.length; i++) {
    const photo = list[i];

    //se a imagem que tem no ftp não existir na pasta public/images, ele baixa ela, se não, não baixa
    if(!fs.existsSync("public/images/" + photo.name))
      await client.downloadTo("public/images/" + photo.name, photo.name);

    /*
    * Esse if-else eu criei para definir que as imagens pares são gratuitas eas ímpares são pagas
    * ele precisa ser alterado conforme o que é definido que é pago ou não, pelo nome ou não sei
    * name é o nome da imagem
    * path é o caminho local da imagem (depois do download do FTP)
    * paid define se ela é paga, 1 é paga e 0 é gratuita
    * 
    * Caso a imagem for paga, ele não leva ela pro front, leva só um cadeado (lock.png) no lugar, é fácil mudar se for o caso.
    */
    if(photo.name.indexOf("PAGO") != -1)
      image_list.push({name: '/lock.png', path: '', paid: 1});
    else
      image_list.push({name: photo.name, path: '/images/', paid: 0});
  }

  // fecha a conexão do ftp
  client.close()

  // renderiza a página image-list passando a lista de imagens
  res.render('image-list', { title: 'Image list', image_list: image_list });
});

module.exports = router;
