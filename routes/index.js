const express = require('express');
const router = express.Router();
const User = require('../models/user');
const view = require("../controllers/viewsController");


// GET /
router.get('/', view.home);

// GET /register
router.get('/register', view.signUp);

//GET route for profile
router.get('/profile', view.profile);

// Log Out logic
router.get('logout', view.logOut);

//login route
router.get('/signin', view.signIn);

//login route and checking existance in database
router.post('/signin', view.checkUserExistance);

// POST /register
router.post('/register', view.createUser);

// GET /about
router.get('/about', view.about);

// GET /contact
router.get('/contact', view.contact);


module.exports = router;
