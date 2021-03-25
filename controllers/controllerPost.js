const Post = require('../models/post');

module.exports.viewPosts =  async (req, res) => {
		const posts = await Post.find({});
		res.render('posts/index', { posts })
};

module.exports.createNewPost = async (req, res) => {
		const newPost = new Post(req.body);
		await newPost.save();
		res.redirect('/posts');
};

module.exports.renderNewPost = (req, res) => {
		res.render('posts/new')};

module.exports.showPage = async (req, res) => {
		const {id} = req.params;
		const post = await Post.findById(id);
		res.render('posts/show', { post })
};

module.exports.editPost =  async (req, res) => {
		const { id } = req.params;
		const {title, text} = req.body;
		await Post.findByIdAndUpdate(id, {title, text}, {
				runValidators: true,
				new: true
		})
		res.redirect('/posts')
};

module.exports.remove = async (req, res) => {
		const {id} = req.params;
		await Post.findByIdAndDelete(id);
		res.redirect('/posts')
};

module.exports.renderEdit = async (req, res) => {
		const { id } = req.params;
		const post = await Post.findById(id);
		res.render('posts/edit', { post })
};
