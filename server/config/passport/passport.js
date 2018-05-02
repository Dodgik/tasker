const bCrypt = require('bcrypt-nodejs');
const { loggedInUser } = require('../../lib/user_helper');

const generateHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

const isValidPassword = function (userpass, password) {
  //console.log("isValidPassword: userpass=", userpass, " password=", password);
  //console.log("isValidPassword: userpass=", userpass, " hashSync=", bCrypt.hashSync(password, bCrypt.genSaltSync(8), null));
  return bCrypt.compareSync(password, userpass);
};

module.exports = function(passport, user) {
  //console.log("-->passport init");
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    //console.log("-->passport deserializeUser:");
    User.findById(id).then(function(user) {
      //console.log("-->passport deserializeUser findById:", user);
      if (user) {
        let userInfo = loggedInUser(user);
        done(null, userInfo);
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use('local-signup', new LocalStrategy(
    {           
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done) {
      
      User.findOne({
        where: { email: email },
        attributes: ['id', 'email', 'firstname', 'password'],
      }).then(function(user) {
        if (user) {
          return done(null, false, { message : 'That email is already taken' });
        } else {
          var userPassword = generateHash(password);
          var data = {
            email: email,
            password: userPassword,
          };

          User.create(data).then(function(newUser, created) {
            if (newUser) {
              let userInfo = loggedInUser(newUser);
              console.log("-->user created userInfo:", userInfo);
              return done(null, userInfo);
            } else {
              return done(null, false);
            }
          });
        }
      }); 
    }
  ));
    
  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done) {
      var User = user;

      User.findOne({
        where: { email: email },
        attributes: ['id', 'email', 'firstname', 'password'],
      }).then(function (user) {
        if (!user) {
          return done(null, false, { message: 'Email does not exist' });
        }

        if (!isValidPassword(user.password, password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
          
        var userInfo = loggedInUser(user);
        console.log("-->user exist - signInOrUp userInfo:", userInfo);
        return done(null, userInfo);
      }).catch(function(err) {
        console.log("Error:", err);
        return done(null, false, { message: 'Something went wrong with your Signin' });
      });
    }
  ));

  //LOCAL SIGNIN or SIGNUP
  passport.use('local-signInOrUp', new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function (req, email, password, done) {
      //console.log("-->passport signInOrUp:", email);
      var User = user;
      
      User.findOne({
        where: { email: email },
        attributes: ['id', 'email', 'firstname', 'password'],
      }).then(function (user) {
        if (user) {
          //console.log("-->user exist:");
          if (!isValidPassword(user.password, password)) {
            return done({ message: 'Incorrect password.' });
          }

          var userInfo = loggedInUser(user);
          console.log("-->user exist - signInOrUp userInfo:", userInfo);
          return done(null, userInfo);
        } else {

          //console.log("-->user not exist");
          var userPassword = generateHash(password);
          var data = {
            email: email,
            password: userPassword
          };

          User.create(data)
          .then(function (newUser, created) {
            if (newUser) {
              let userInfo = loggedInUser(newUser);
              userInfo.isFirstLogin = true;
              console.log("-->user created userInfo:", userInfo);
              return done(null, userInfo);
            } else {
              return done({ message: 'Server error.' });
            }
          })
          .catch(function (err) {
            console.log('User-create message: ', err.message);
            return done({ message: err.errors[0].message });
          });
        }
      }).catch(function (err) {
        console.log("Error:", err);
        return done({ message: 'Something went wrong with your Signin' });
      });
    }
  ));

}
