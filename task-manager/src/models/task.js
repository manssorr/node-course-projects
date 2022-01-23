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
}, {
	timestamps: true,
})

module.exports = Task = mongoose.model('Task', TaskSchema)
