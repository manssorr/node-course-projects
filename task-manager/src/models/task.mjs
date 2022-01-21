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
	Owner
})

TaskScheme.pre('save', async function(next) {
	const task = this;
	
	console.log('Heloo boy! ✔️');

	next()
})

export default mongoose.model('Task', TaskScheme)
