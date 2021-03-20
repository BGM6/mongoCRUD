//View All Posts
// app.get('/posts', async (req, res) => {
// 		const posts = await Post.find({});
// 		// console.log(posts);
// 		res.render('posts/index', { posts })
// });

//Create new post
// app.get('/posts/new', (req, res) => {
// 		res.render('posts/new');
// })
// app.post('/posts', async (req, res) => {
// 		const newPost = new Post(req.body);
// 		await newPost.save();
// 		res.redirect('/posts');
// })

//show page
// app.get('/posts/:id', async (req, res) => {
// 		const {id} = req.params;
// 		const post = await Post.findById(id);
// 		res.render('posts/show', { post })
// })

//Edit
// app.get('/posts/:id/edit', async (req, res) => {
// 		const { id } = req.params;
// 		const post = await Post.findById(id);
// 		res.render('posts/edit', { post })
// })

// app.put('/posts/:id', async (req, res) => {
// 		const { id } = req.params;
// 		const {title, text} = req.body;
// 		await Post.findByIdAndUpdate(id, {title, text}, {
// 				runValidators: true,
// 				new: true
// 		})
// 		res.redirect('/posts')
// })

//Delete
// app.delete('/posts/:id', async (req, res) => {
// 		const {id} = req.params;
// 		await Post.findByIdAndDelete(id);
// 		res.redirect('/posts')
// })

