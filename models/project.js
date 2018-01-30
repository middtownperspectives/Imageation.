// project model and schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  cover: [String],
  title: String,
  name: String,
  field: String
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;