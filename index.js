const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/post');
const path = require('path');
const PORT = 5000;
const app = express();

//mongo connection
mongoose.connect('mongodb://localhost:27017/blogDb', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION OPEN'));
db.once('open', () => {
		console.log('DATABASE CONNECTED')
})

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//View All Posts
app.get('/posts', async (req, res) => {
		const posts = await Post.find({});
		// console.log(posts);
		res.render('posts/index', { posts })
});

//Create new post
app.get('/posts/new', (req, res) => {
		res.render('posts/new');
})
app.post('/posts', async (req, res) => {
		const newPost = new Post(req.body);
		await newPost.save();
		res.redirect('/posts');
})

//show page
app.get('/posts/:id', async (req, res) => {
		const {id} = req.params;
		const post = await Post.findById(id);
		res.render('posts/show', { post })
})

app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
});

