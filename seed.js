//Initail database with our basic data for page
const mongoose = require("mongoose");
const Projects = require("./models/photosearcher");


const seedProjects = [
	{
		title: "The Noname Journey",
    	creator: "Carol Dorthy",
    	field: "Book Cover Illustration",
    	image: "http://static.djbooth.net/pics-features/rect/noname-telefone.jpg"
	},{
		title: "Zhara",
    	creator: "Kirill Polyakov",
    	type: "Music Album Illustration",
    	image: "http://bigupmag.com/wp-content/uploads/2014/04/xhara.jpg"
	}

];

mongoose.connect('mongodb://localhost/imageation');

Projects.create(seedProjects, (error, project) => {
	if(error) { 
		return console.log("error" + error)};
		console.log("Projects seeded" + project);
		console.log("initial projects!!!");
		mongoose.connection.close();
});