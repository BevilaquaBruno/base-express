const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
var morgan = require('morgan');
var path = require('path');
var createError = require('http-errors');
//var fs = require('fs')

//inicia o express (api)
const app = express();

// configura as variáveis do .env
dotenv.config();
const port = process.env.PORT;

//funções de segurança do express
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// morgan é um logger, que mostra no cmd as urls que estão sendo visitadas
app.use(morgan('dev'));

//define o diretório public como estático
app.use(express.static(path.join(__dirname, 'public')));

// define o pug como renderizador de views - https://pugjs.org/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// pega a rota das imagens
const imagesRouter = require('./routes/images');

// chama arota no /
app.use('/', imagesRouter);

// Handle para caso acessar uma página que não existe
app.use(function(req, res, next) {
  next(createError(404));
});

// chama a página
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//roda o app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

