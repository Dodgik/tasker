const config = require('../config/config.js');
var intel = require('intel');
intel.basicConfig({
  'file': 'error.log',
  'format': '[%(date)s] %(name)s.%(levelname)s: %(message)s',
});

var express = require('express');
var path = require('path');
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')

const Email = require('email-templates');
const nodemailer = require('nodemailer');

const mailer = require('../lib/mailer');

var async = require('async');
var crypto = require('crypto');

var ssr = require('./ssr');

const app = express();

console.log('process.env.PORT=', process.env.PORT);
console.log('config.app_port', config.app_port);
const appPort = process.env.PORT || config.app_port || 65535
console.log('appPort', appPort);
app.set('port', appPort);

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
  secret: config.session_secret,
  name: config.session_name,
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

var User = require('../db/models/users');
require('../config/passport/passport.js')(passport, User);


var userRouter = require('./user');
app.use('/a/user', userRouter);

app.all('/', function (req, res, next) {
  console.log('Root Request Type:', req.method);
  console.log('Time:', Date.now());
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/logout', function (req, res) {
  //console.log('logging out');
  req.logout();
  res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

app.get('/protected', ensureAuthenticated, function (req, res) {
  res.send("acess granted");
});

const viewsDir = './views'
//const viewsDir = path.join(__dirname, '../views')
console.log('-->viewsDir: ', viewsDir);
app.set('views', viewsDir);
app.set('view engine', 'ejs');

console.log('__dirname=', __dirname);
const publicDir = './public'
//const publicDir = path.join(__dirname, 'public')
console.log('publicDir=', publicDir);
app.use(express.static(publicDir));
//app.use(express.static('public'));

app.use('/', ssr);
app.use('/view/*', ssr);

app.use(function(err, req, res, next) {
  console.error('-->500: ', req.url);

  res.status(err.status || 500);
  res.render('500', { error: err });
});

app.use(function(req, res, next) {
  console.error('-->404: ', req.url);
  res.status(404);

  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  res.type('txt').send('Not found');
});

var server = app.listen(appPort, '127.0.0.1', () => {
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
});

/*
const testFolder = './';
const fs = require('fs');
fs.readdirSync(viewsDir).forEach(file => {
  console.log(file);
})
*/