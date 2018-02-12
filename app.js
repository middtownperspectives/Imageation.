const express = require ("express");
const passport = require("passport");
const flash = require("flash");
const app = express();
// const morgan = require("morgan");
// app.use(morgan('dev')); // back end request monitoring
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const ejs = require("ejs");

//set up to work locally and or on heroku
let Key = process.env.behanceKey || require("./env.js");
let apiUrl = "http://www.behance.net/v2/projects?client_id=" + Key;

//checking for errors on mongo database
const db = require("./models");

//serves static files
app.use(express.static(__dirname + "/public"));

//sets my html and scripting pages to views
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// provides the means for express to save sessions during a users experience...  maintain login and password info
// also provides a means of providing google analitics with info for user activity
app.use(session({ secret: "An imageation is everything", resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 
require('./config/passport')(passport);


const loginRoutes = require("./routes/index.js");
app.use(loginRoutes);
const projectRoutes = require("./routes/projects.js");
app.use(projectRoutes);


//make user id avaiable globally
app.use(function(req, res, next){
	res.locals.currentUser = req.session.userId;
	next();
});

//----- handling errors when calling routes
app.use((err, req, res, next) => {
	if(err){ 
		// let message =  "something went wrong";
		res.render('error', { message : err.message});
	} else 
	console.log(err.message);
	res.status(422).send(err);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is running on http://localhost:3000/');
});

exports.closeServer = () => {
  server.close();
};

