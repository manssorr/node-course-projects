const mongoose = require('mongoose');

// Task => Schema & Model
const TaskSchema = mongoose.Schema({
	description: {
		type: String,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	}
})

TaskSchema.pre('save', async function(next) {
	const task = this;
	
	console.log('Hello boy! ✔️');

	next()
})

module.exports = Task = mongoose.model('Task', TaskSchema)
