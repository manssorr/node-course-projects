import mongoose from 'mongoose';

async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const User = new mongoose.Schema({
	name: String,
	age: Number,
})
}
const Kitten = mongoose.model('Kitten', kittySchema);

const Mansour = new User({name: 'Mansour Koora'})

await Mansour.save()

main()
	.then(console.log('Hi'))
	.catch(console.error)