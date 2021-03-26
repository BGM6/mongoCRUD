const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
		res.render('auth/register');
};

module.exports.userRegistration = async (req, res) => {
		const { password, username } = req.body;
		const hash = await bcrypt.hash(password, 12);
		const user = new User({
				username,
				password: hash
		})
		await user.save();
		req.session.user_id = user._id;
		res.redirect('/posts');
}

module.exports.renderLogin = (req, res) => {
		res.render('auth/login');
}

module.exports.userLogin = async (req, res) => {
		const { username, password } = req.body;
		const user = await User.findOne({username});
		const validatePassword = await bcrypt.compare(password, user.password);
		if(validatePassword) {
				req.session.user_id = user._id;
				res.redirect('/posts');
		} else {
				res.redirect('/login');
		}
}
