var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
const { getFtpConnection } = require('../helpers');
const fs = require('fs');

dotenv.config();


/* VIEW ENDPOINTS */
// GET images page
router.get('/', async (req, res, next) => {
  const client = await getFtpConnection();
  //await client.downloadToDir("public/images/", "/");

  let image_list = [];
  var list = await client.list();
  for (let i = 0; i < list.length; i++) {
    const photo = list[i];

    if(!fs.existsSync("public/images/" + photo.name))
      await client.downloadTo("public/images/" + photo.name, photo.name);

    if(i % 2 == 0)
      image_list.push({name: '/images/'+photo.name, path: '', paid: 0});
    else
      image_list.push({name: '/lock.png', path: '', paid: 1});
  }
  client.close()

  res.render('image-list', { title: 'Image list', image_list: image_list });
});

/* JSON ENDPOINTS */
// GET image list
/*
router.get('/u', async (req, res, next) => {
  const client = await getFtpConnection();

  await client.downloadToDir("public/images/", "/");
  var list = await client.list();
  for (let i = 0; i < list.length; i++) {
    const photo = list[i];
    await client.downloadTo("public/images/" + photo.name, photo.name);
  }

  client.close()
});
*/

module.exports = router;
