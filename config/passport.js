var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');

 module.exports = function(passport) {

  passport.serializeUser(function(user, callback) {
    console.log(user);
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    console.log(id);
    User.findById(id, function(err, user) {
        callback(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
     
     usernameField : 'email',
     passwordField : 'password',
     passReqToCallback : true
  }, function(req, email, password, callback) {
    // Find a user with this e-mail
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) return callback(err);

      // If there already is a user with this email
      if (user) {
				return callback(null, false, req.flash('signupMessage', 'This email is already used.'));
      } else {
      // There is no user registered with this email
				// Create a new user
				var newUser            = new User();
				newUser.local.email    = email;
				newUser.local.password = newUser.encrypt(password);

				newUser.save(function(err) {
				  if (err) throw err;
				  return callback(null, newUser);
				});
      }
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
    // Search for a user with this email
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) {
        return callback(err);
      }

      // If no user is found
      if (!user) {
        return callback(null, false, req.flash('loginMessage', 'No user found.'));
      }
      // Wrong password
      if (!user.validPassword(password)) {
        return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }

      return callback(null, user);
    });
  }));
};