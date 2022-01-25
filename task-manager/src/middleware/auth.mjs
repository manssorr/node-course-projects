import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export default async (req, res, next) => {
	console.log("Hi! 👋, I'm Auth 🗝️ ");
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({ _id: decoded._id, "tokens.token": token })

		console.log('AlSalamAlykom man 👋 !');

		if (!user) {
			throw new Error()
		}

		req.token = token
		req.user = user
		next()
	} catch (error) {
		res.status(401).send('Please, login correctly 🗝️🙁 .')
	}
}