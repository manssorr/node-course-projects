import mongoose from 'mongoose';

// Task => Schema & Model
const TaskScheme = mongoose.Schema({
	description: {
		type: String,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	Owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	}
})

TaskScheme.pre('save', async function(next) {
	const task = this;
	
	console.log('Hello boy! ✔️');

	next()
})

export default mongoose.model('Task', TaskScheme)
