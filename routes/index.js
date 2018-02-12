var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/static');


function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) return next();

  // Otherwise the request is always redirected to the home page
  res.redirect('/');
}

router.get('/', staticsController.home);

router.get('/signup', usersController.getSignup);
router.post('/signup', usersController.postSignup);

router.get('/login', usersController.getLogin);
router.post('/login', usersController.postLogin);

router.route("/logout")
  .get(usersController.getLogout);

router.route("/secret")
  .get(authenticatedUser, usersController.secret);

// GET /about
router.get('/about', usersController.about);

// GET /contact
router.get('/contact', usersController.contact);

module.exports = router;
