const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//set up to work locally and or on heroku
let Key = process.env.behanceKey || require("./env.js");
let apiUrl = "http://www.behance.net/v2/projects?client_id=" + Key;

/************
 * DATABASE *
 ************/
//connection to heroku and local comp.
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost:27017/imageation"); 
const db = mongoose.connection;

//checking for errors on mongo database
db.on("error", console.error.bind(console, "connection error"));



app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


//serves static files
app.use("/static", express.static("public"));

//sets my html and scripting pages to views
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

const loginRoutes = require("./routes/index.js");
app.use(loginRoutes);
const projectRoutes = require("./routes/projects.js");
app.use(projectRoutes);

// provides the means for express to save sessions during a users experience...  maintain login and password info
// also provides a means of providing google analitics with info for user activity
app.use(session({
	secret: "An imageation is everything",
	resave: true,
	saveUninitialized: false
}));

//make user id avaiable globally
app.use(function(req, res, next){
	res.locals.currentUser = req.session.userId;
	next();
});



//----- handling errors when calling routes
app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.render("error");
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is running on http://localhost:3000/');
});
