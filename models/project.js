// project model and schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
  title: String,
  creator: String,
  field: String,
  image: String,
  apiId: Number
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
