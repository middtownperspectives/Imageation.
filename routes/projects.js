const request = require('request');
const express = require("express");
const router = express.Router();
const Project = require ('../models/project');


//set up to work locally and or on heroku
let Key = process.env.behanceKey || require("../env.js");
let apiUrl = "http://www.behance.net/v2/projects?client_id=" + Key.Key +"";


//get searched list of projects from text
router.get('/projects/search', function (req, res) {
	

	console.log('/projects/search is working');
	request(apiUrl, function(error, info, body){
	let searchArray = [];	
		console.log("inside request");
	let projectInfo = JSON.parse(body);
	let PROJECTS = projectInfo.projects;
	for(var i = 0; i < PROJECTS.length; i++){
		let trialArray = PROJECTS[i].owners;
		//console.log(trialArray);
		searchArray.push(trialArray);

		}
		console.log(searchArray[4]);

		let searchRequest = searchArray.map(search => {
			console.log (search);
			return {
				name : search.first_name
			};
		});	

	});
		
	res.send(searchRequest);
});




//get initial list of projects 
router.get('/projects', function (req, res) {
	console.log('/projects is working');
	request(apiUrl, function(error, info, body){
		let projectInfo = JSON.parse(body);
		let PROJECTS = projectInfo.projects;
		console.log(typeof(PROJECTS));
				console.log(PROJECTS);

		let projectRequest = PROJECTS.map(project => {
			//console.log('you. should see projects up front');
			return {
				name: project.name,
				//description: project.
				//image: project.covers.original,
				genre: project.fields
			};
		});
		//console.log(projectRequest);
		res.render('projects', { display : projectRequest });
	});
});


module.exports = router;
