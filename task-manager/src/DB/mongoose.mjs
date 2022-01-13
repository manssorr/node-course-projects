import mongoose from 'mongoose';
import validator from 'validator';

async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

	// Schemas
	const UserSchema = new mongoose.Schema({
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
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
				if( value.toLowerCase().includes('password')) {
					throw new Error ("can't make password = password")
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
		}
	});
	
	const TaskScheme = mongoose.Schema({
		description: {
			type: String,
			trim: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	})

	// Models
	const User = mongoose.model('User', UserSchema);
	const Task = mongoose.model('Task', TaskScheme)
	
	// Instances of the models

	const user = new User({
		name: 'Basha',
		email: 'mans@mans.mans',
		age: 1,
		password: '           Pass,,word       ',
	})
	const task = new Task({
		description: 'Done Node till 30 => 101',
		completed: false,
	})


	await user.save()
		.then(console.log(user))
		.catch(console.error)

	await task.save()
		.then(console.log(task))
		.catch(console.error)
}




main()
	.catch(console.error)
	.finally(() => mongoose.disconnect());