var express = require('express');
var router = express.Router();

/* VIEW ENDPOINTS */
// GET images page
router.get('/', (req, res, next) => {
  res.render('test', { title: 'Title test', message: 'content test' });
});

/* JSON ENDPOINTS */
// GET imagem list
router.get('/list', (req, res, next) => {
  res.json({ test: 'success' });
});

module.exports = router;
