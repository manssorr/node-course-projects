import mongoose from 'mongoose';

async function connectDB() {
	await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

	// Instances of the models
	// const user = new User({
	// 	name: 'Basha',
	// 	email: 'mans@mans.mans',
	// 	age: 1,
	// 	password: '           Pass,,word       ',
	// })
	// const task = new Task({
	// 	description: 'Done Node till 30 => 101',
	// 	completed: false,
	// })


	// 	await task.save()
	// 		.then(console.log(task))
	// 		.catch(console.error)
}

export default connectDB()
	.catch(console.error)
	.finally(() => mongoose.disconnect());
