const request = require('request');
const express = require("express");
const router = express.Router();
const Project = require ('../models/project');
const db = require("../models");

//array of stuff i got from my api
let StuffIGotFromMyApi = [];

//functions specific for api calls
//set up to work locally and or on heroku
let Key = process.env.behanceKey || require("../env.js").Key;
let apiUrl = "http://www.behance.net/v2/projects?client_id=" + Key;

//get initial list of projects 
const listOfProjects = function (req, res, next) {
	console.log('/projects is working');
	request(apiUrl, function(err, info, body){
		if (err) {
			console.log("no go with api " + err);
		} else {
			console.log("api call");
			//console.log(apiUrl);
			let projectInfo = JSON.parse(body);
			let PROJECTS = projectInfo.projects;
			let projectRequest = PROJECTS.map(project => {
				//console.log(project);
				//console.log('you. should see projects up front');
				return {
				apiId: project.id,
				title: project.name,
				field: project.fields,
				image: project.covers.original
			};
			}); 
			console.log(projectRequest[2]);
			//console.log(projectRequest);
			res.render('projects.ejs', { display : projectRequest });
		}
	});
};

// grabbing from database
const favoriteProjects = (req, res, next) => {
	db.Project.find({}, (err, projects) => {
		if(err){ 
			let message =  "Could not find any projects";
			res.render('error', { message : message} );
		} else 
		console.log(projects);
		console.log("project name: " + projects.title);
		res.render('profile', {projects : projects} );
		console.log("favorite projects");
		});
};

// saving item from api to mongodb
const savefavoriteProject =  (req, res, next) => {
	console.log("saving favorites");
	console.log(req.body);
	db.Project.create(req.body).then((newfavorites) => {
		req.flash('success', 'Saved to favorites!');
	}).catch(next);

};


// SHOW a single project 
function getProject(req, res, next) {
  var id = req.params.id;
    if (id == "newquote"){
      console.log("yes, it is a newquote");
      res.render('newquote');
    } else {
    db.Project.findById({_id: id}, function(err, quote) {
      if(err) {
        res.json({ message: 'Could not get quote: ' + id });
      } else {
        //console.log(res.body);
        // res.json({quote: quote});
        res.render('./quotes/edit', {quote: quote});
      }
    });
   }
}



// delete project
const deleteFavorite = (req, res, next) => {
console.log("delete route");



  // get book id from url params (`req.params`)
  console.log("DELETE " + req.body.params);
  // var bookId = req.params.id;
  // // find the index of the book we want to remove
  // db.Book.findOneAndRemove({ _id: bookId })
  //   .populate('author')
  //   .exec(function (err, deletedBook) {
  //   res.json(deletedBook);
  // });
};


// // DELETE
// function removeQuote(req, res) {
//   var id = req.params.id;
//   console.log("hello from removeQuote");

//   Quote.remove({_id: id}, function(err) {
//     if(err) res.json({message: 'Could not delete quote: ' + err});

//     // res.json({message: 'Quote successfully deleted'});
//     res.redirect('/quotes');
//   });
// }





// const savefavoriteProject =  (req, res) => {
//   var myData = new User(req.body);
//   myData.save()
//     .then(item => {
//       res.send("item saved to database");
//     })
//     .catch(err => {
//       res.status(400).send("unable to save to database");
//     });
// };

module.exports = { listOfProjects, favoriteProjects, savefavoriteProject, deleteFavorite };






// //get searched list of projects from text
// router.get('/projects/search', function (req, res) {
// 	console.log('/projects/search is working');
// 	request(apiUrl, function(error, info, body){
// 	let searchArray = [];	
// 		console.log("inside request");
// 	let projectInfo = JSON.parse(body);
// 	let PROJECTS = projectInfo.projects;
// 	for(var i = 0; i < PROJECTS.length; i++){
// 		let trialArray = PROJECTS[i].owners;
// 		//console.log(trialArray);
// 		searchArray.push(trialArray);

// 		}
// 		console.log(searchArray[4]);

// 		let searchRequest = searchArray.map(search => {
// 			console.log (search);
// 			return {
// 				name : search.first_name
// 			};
// 		});	

// 	});
// 	res.send(searchRequest);
// });


