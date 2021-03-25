const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const postRoutes = require('./routes/postRoutes')
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
//Need to render error layout
const ejsMate = require('ejs-mate');
const path = require('path');
const PORT = 5000;

//Auth
const bcrypt = require('bcrypt')
const session = require('express-session');

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
const app = express();

//Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'));
//session setup
app.use(session({
		resave: false,
		saveUninitialized: true,
		secret: 'monkey123456',
}));

//ejs
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middleware
const requireLogin = (req, res, next) => {
		if(!req.session.user_id) {
				return res.redirect('/login')
		} else {
				next();
		}
}

//Register
app.get('/register', (req, res) => {
		res.render('auth/register');
})

app.post('/register', async (req, res) => {
		const { password, username } = req.body;
		const hash = await bcrypt.hash(password, 12);
		const user = new User({
				username,
				password: hash
		})
		await user.save();
		req.session.user_id = user._id;
		res.redirect('/posts');
})

//Login
app.get('/login', (req, res) => {
		res.render('auth/login');
})

app.post('/login', async (req, res) => {
		const { username, password } = req.body;
		const user = await User.findOne({username});
		const validatePassword = await bcrypt.compare(password, user.password);
		if(validatePassword) {
				req.session.user_id = user._id;
				res.redirect('/posts');
		} else {
				res.redirect('/login');
		}
})

//express router
app.use('/posts', requireLogin, postRoutes)


//Error catching routes
app.all('*', (req, res, next) => {
		next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
		const { statusCode = 500 } = err;
		if (!err.message) err.message = 'Oh No, Something Went Wrong!'
		res.status(statusCode).render('error.ejs', { err })
})

app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
});

