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

// grabbing profile with favorite projects from database
const favoriteProjects = (req, res, next) => {
	Project.find({}, (err, projects) => {
		console.log(projects);
		if(err){ 
			let message =  "Could not find any projects " + err;
			res.render('error', { message : message} );
		} else {
		console.log("project Title: " + projects.title);
		console.log("project Creator: " + projects.creator);
		console.log("project Field: " + projects.field);
		console.log("project Image: " + projects.image);
		console.log("project Image: " + projects.apiId);
		res.render('profile', {projects : projects} );
		}
		});
};

// saving item from api to mongodb favorite projects
const savefavoriteProject =  (req, res, next) => {
	console.log("saving favorites");
	console.log("button id test: ");
	console.log(req.body);
	db.Project.create(req.body).then((newfavorites) => {
		res.redirect("/profile");
	}).catch(next);
};


const deleteFavorite = (req, res, next) => {
	console.log(req.params._id);
	db.Project.findByIdAndRemove({_id: req.params.id })
	.then((goByeBye) => {
		res.render("profile");
	});
};

module.exports = { listOfProjects, favoriteProjects, savefavoriteProject, deleteFavorite };
