const { Schema, model } = require('mongoose');

const userSchema = new Schema({
		username: {
				type: String,
				required: [true, 'Username can not be blank'],
				unique: [true, 'Username already exist']
		},

		password: {
				type: String,
				required: true,
				min: [6, 'Password must be at least 6 characters long']
		}
})

const User = model('Users', userSchema);

module.exports = User;
