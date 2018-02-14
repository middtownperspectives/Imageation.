const passport = require("passport");
const User     = require('../models/user');

// GET /signup
function getSignup(request, response, next) {
	response.render('signup', { message: request.flash('signupMessage') });
}

// POST /signup
function postSignup(request, response, next) {
  console.log("we are in sign up");
  console.log(request.body);
  console.log("cookies " + request.cookies);
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
  });
  return signupStrategy(request, response, next);
}

// GET /login
function getLogin(request, response, next) { 
	response.render('login', { message: request.flash('loginMessage') });
}

// POST /login 
function postLogin(request, response, next) {
    var loginProperty = passport.authenticate('local-login', {
      successRedirect : '/projects',
      failureRedirect : '/login',
      failureFlash : true
    });
    return loginProperty(request, response, next);	
}

// GET /logout
function getLogout(request, response, next) {  
	request.logout();
  response.redirect('/');
}

// GET /about
const about = function(req, res, next) {
  return res.render('about', { title: 'About' });
};

// GET /contact
const contact = function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
};

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  about: about,
  contact: contact
};