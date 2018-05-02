var express = require('express');
var path = require('path');
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')

var ssr = require('./routes/ssr');

const app = express();

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

var User = require('./db/models/users');
require('./config/passport/passport.js')(passport, User);


app.post('/login', function (req, res, next) {
  passport.authenticate('local-signInOrUp', function (err, user, info) {
    if (err) {
      //console.log('login err: ', err);
      if (req.xhr) {
        //console.log('login is xhr');
        res.json({ success: false, message: err });
      } else {
        //console.log('login is not xhr');
        return next(err);
      }
    } else if (user) {
      //console.log('login user: ', user);
      req.logIn(user, function (err) {
        if (err) {
          //console.log('login user error: ', err);
          if (req.xhr) {
            res.json({ success: false, message: err });
          } else {
            return next(err);
          }
        } else {
          if (req.xhr) {
            //console.log('login user is xhr');
            res.json({ success: true });
          } else {
            //console.log('login user is not xhr');
            return res.redirect('/');
          }
        }
      });
    } else if (user) {
      return res.redirect('/user-not-faund');
    }
  })(req, res, next);
});

app.get('/logout', function (req, res) {
  //console.log('logging out');
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

app.get('/protected', ensureAuthenticated, function (req, res) {
  res.send("acess granted");
});

console.log('views=', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

console.log('__dirname=', __dirname);
console.log('static path=', path.join(__dirname, 'public'));
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/*', ssr);

var server = app.listen(3000, '127.0.0.1', () => {
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
});
