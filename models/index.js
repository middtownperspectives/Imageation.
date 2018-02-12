const mongoose = require("mongoose");
/************
 * DATABASE *
 ************/
//connection to heroku and local comp.
mongoose.connect( process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URI || "mongodb://localhost:27017/imageation"); 
let Project = require ("./project");
let User = require("./user");

module.exports.Project = require ("./project.js");
module.exports.User = require("./user.js"); 
