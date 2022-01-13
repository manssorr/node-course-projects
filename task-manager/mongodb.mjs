import { MongoClient, ObjectId } from 'mongodb'
// DATA
const many = [{
	name: 'Mansour Koura',
	age: 22,
}, {
	name: 'Mohamed Abd-elmoniem',
	age: 23,
}, {
	name: 'Amr Ahmed',
	age: 23,
}, {
	name: 'Khalid Ahmed',
	age: 24,
}];

const tasks = [{
	description: 'Done 18 Node',
	completed: false,
}, {
	description: 'Done 19 Node',
	completed: false,
}, {
	description: 'Done 20 Node',
	completed: false,
}]

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'task-manager';

async function main() {

	// Use connect method to connect to the server
	await client.connect();
	console.log('Connected successfully to database');

	const db = client.db(dbName);
	const usersCollection = db.collection('users');
	const tasksCollection = db.collection('tasks');

	// // Insert a Document
	// await usersCollection.insertOne({
	// 	name: 'Mansour Koura',
	// 	age: 22,
	// }).then(({ insertedId }) => console.log(insertedId))
	// 	.catch('Unable to insert Doc!')

	// await usersCollection.insertMany(many).then(({ insertedCount, insertedIds }) => {
	// 	console.log(insertedCount, insertedIds)
	// })
	// 	.catch('Unable to insert Doc!');

	// await tasksCollection.insertMany(tasks).then(({ insertedCount, insertedIds }) => {
	// 	console.log(insertedCount, insertedIds)
	// })
	// 	.catch('Unable to insert Doc!');


	// Find All Documents
	await usersCollection.findOne({
		_id: new ObjectId("61daf8da3cfbe1e13988e843")
	})
		.then((findResult) => console.log('Found documents =>', findResult))
		.catch(error => console.log(error))
	// await tasksCollection.find({ completed: false }).toArray().then((findResult) => { console.log('All Found documents =>', findResult) })

	// Update a document
	await usersCollection.updateOne({
		_id: new ObjectId("61daf8da3cfbe1e13988e843")
	}, {
		$set: {
			name: 'Mansour Basha'
		}
	})
		.then((updateResult) => console.log('Updated =>', updateResult))
		.catch(error => console.log(error))

	// // Remove a document
	// const deleteResult = await usersCollection.deleteMany({ a: 3 });
	// console.log('Deleted documents =>', deleteResult);

	// // Index a Collection
	// const indexName = await usersCollection.createIndex({ a: 1 });
	// console.log('index name =', indexName);

	return 'done.';
}

main()
	.then(console.log)
	.catch(console.error)
	.finally(() => client.close());