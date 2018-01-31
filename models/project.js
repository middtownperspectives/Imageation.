// project model and schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  title: String,
  creator: String,
  field: String,
  image: String
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = ProjectSchema;