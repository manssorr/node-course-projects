const bcrypt = require('bcryptjs');
const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// User => Schema & Model
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid')
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 7,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error("can't make password = password")
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('age cant be -Ve');
			}
		}
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
});

// Remove the field of password and token all around the system
UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// User => Generate a token by jwt
UserSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, 'Alhamdullah');
	user.tokens = user.tokens.concat({ token })
	await user.save();

	console.log(token);
	return token;
}

// User => Check login process
UserSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email })

	if (!user) {
		throw new Error('Unable to login ⛔️ !')
	}

	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		throw new Error('Wrong password ❌ !')
	}

	return user
}

// Hashing plain text password
UserSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}

	next();
})



module.exports = User = mongoose.model('User', UserSchema)