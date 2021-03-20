const express = require('express');
const mongoose = require('mongoose');
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

app.get('/', (req, res) => {
		res.send('Homepage');
});

app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
});

