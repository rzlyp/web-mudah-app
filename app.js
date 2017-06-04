var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://mudah-app:mudah123@ds151451.mlab.com:51451/mudah-apps");

const check = mongoose.connection;
check.on('error',() =>{
	console.log('Error connection');
});

check.on('open',()=>{
	console.log('mongoodb is connected ..');
});




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./config/passport')(passport);
app.use(session({secret:'iloveyousomuch'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./app/routes/admin')(app, passport);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send("Something error");
});

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send(err);
// });

module.exports = app;
