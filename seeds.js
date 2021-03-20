const Post = require('./models/post');
const mongoose = require('mongoose');

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

const seedPosts = [
		{
				username: 'Hayden',
				title: 'Are you Happy?',
				text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.'
		},
		{
				username: 'Emerson',
				title: 'I am bato hear me roar!',
				text: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking."
		},
		{
				username: 'Niko',
				title: 'Hello World!',
				text: "Life is what happens when you're busy making other plans."
		},
		{
				username: 'Roady',
				title: 'Why am I also so HUNGRY?!',
				text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success."
		},
		{
				username: 'Joyce',
				title: 'I love Oprah!',
				text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough"
		},
]

Post.insertMany(seedPosts)
.then(result => console.log(result))
.catch(err => console.log(err))
