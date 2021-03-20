const express = require('express');
const mongoose = require('mongoose');
// const Post = require('./models/post');
const postRoutes = require('./routes/postRoutes')
const methodOverride = require('method-override');
const path = require('path');
const PORT = 5000;

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

//ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//express router
app.use('/posts', postRoutes)


app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
});

