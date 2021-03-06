const { Schema, model } = require('mongoose');

const postSchema = new Schema({
		username: {
				type: String,
				required: true,
		},
		title: {
				type: String,
				required: true,
		},
		text: {
				type: String,
				required: true,
		}
})

const Post = model('Post', postSchema);

module.exports = Post;

