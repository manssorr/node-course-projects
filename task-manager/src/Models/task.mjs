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
})

export default mongoose.model('Task', TaskScheme)
