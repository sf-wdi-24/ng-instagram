var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PhotoSchema = new Schema({
  url: String,
  user: String,
  likes: Number
});

var Photo = mongoose.model('Photo', PhotoSchema);
module.exports = Photo;