const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title : String,
	image  : String,
	body : String,
	createdAt : Date
});

const post = mongoose.model("Post", postSchema);

module.exports = post;