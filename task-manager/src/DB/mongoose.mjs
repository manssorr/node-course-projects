import mongoose from 'mongoose';

async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

	const UserSchema = new mongoose.Schema({
		name: String,
		age: Number,
	});

	const addUser = mongoose.model('addUser', UserSchema);
	const Mansour = new addUser({ name: 'Mansour Koora', age: 22 })
	await Mansour.save()
		.then(console.log(Mansour))
		.catch(console.error)

}

main()
	.then(console.log)
	.catch(console.error)