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
			console.log(project.apiId);
			}); 
			res.render('projects.ejs', { display : projectRequest });
		}
	});
};

// grabbing profile with favorite projects from database
const favoriteProjects = (req, res, next) => {
	console.log("grabbing favorites directing to profile");
	Project.find({}, (err, projects) => {
		console.log(projects);
		if(err){ 
			let message =  "Could not find any projects " + err;
			res.render('error', { message : message} );
		} else {
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

//update a favorite's field
const updateFavorites = (req,res, next) => {
	console.log("update router");
	console.log(req.body);
};


// delete a favorite
const deleteFavorite = (req, res, next) => {
	console.log("delete router");
	console.log(req.params.id);
	db.Project.findByIdAndRemove({_id: req.params.id })
	.then((goByeBye) => {
		res.redirect("/profile");
	}).catch(next);
};

module.exports = { listOfProjects, favoriteProjects, savefavoriteProject, updateFavorites, deleteFavorite };
