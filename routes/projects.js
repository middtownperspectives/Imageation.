const request = require('request');
const express = require("express");
const router = express.Router();
const api = require("../controllers/apiController");

//set up to work locally and or on heroku
let Key = process.env.behanceKey || require("../env.js");
let apiUrl = "http://www.behance.net/v2/projects?client_id=" + Key.Key +"";

//get initial list of projects 
router.get('/projects', api.listOfProjects);

//get list of favorites from database
router.get('/profile', api.favoriteProjects);

// save favorite
router.post('/projects', api.savefavoriteProject);

router.delete('/profile/:id', api.deleteFavorite);
//get searched list of projects from text
//router.get('/projects/search', api.searchListOfProjects);


module.exports = router;
