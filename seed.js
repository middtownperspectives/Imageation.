//Initail database with our basic data for page
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/imageation');
const Projects = require("./models/project");

console.log(Projects);

Projects.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
});

const seedProjects = [	
	{
		title: "The Noname Journey",
    	creator: "Carol Dorthy",
    	field: "Illustration",
    	image: "http://static.djbooth.net/pics-features/rect/noname-telefone.jpg"
	}, {
		title: "Zhara",
    	creator: "Kirill Polyakov",
    	field: "Illustration",
    	image: "http://bigupmag.com/wp-content/uploads/2014/04/xhara.jpg"
	}
];

Projects.create(seedProjects, (error, project) => {
	if(error) { 
		return console.log("error" + error)};
		console.log("Projects seeded" + project);
		console.log("initial projects!!!");
		mongoose.connection.close();
});




