const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
var morgan = require('morgan');
var path = require('path');
var createError = require('http-errors');
//var fs = require('fs')

const app = express();

dotenv.config();
const port = process.env.PORT;

app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// create a write stream (in append mode)
//var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
//app.use(morgan('dev', { stream: accessLogStream }));
app.use(morgan('dev'));

//uncomment when have static files
//app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const imagesRouter = require('./routes/images');

//routes
app.use('/images', imagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

