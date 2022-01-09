import { MongoClient } from 'mongodb'
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


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'task-manager';

async function main() {
	// Use connect method to connect to the server
	// Use connect method to connect to the server
	await client.connect();
	console.log('Connected successfully to database');

	const db = client.db(dbName);
	const usersCollection = db.collection('users');
	const tasksCollection = db.collection('tasks');

	// Insert a Document
	await usersCollection.insertOne({
		name: 'Mansour Koura',
		age: 22,
	}).then(({ insertedId }) => console.log(insertedId))
		.catch('Unable to insert Doc!')

	await usersCollection.insertMany(many).then(({ insertedCount, insertedIds }) => console.log(`Insrted users num: ${insertedCount}`, insertedIds))
		.catch('Unable to insert Doc!')


	// // Find All Documents
	// const findResult = await usersCollection.find({}).toArray();
	// console.log('Found documents =>', findResult);

	// // Update a document
	// const updateResult = await usersCollection.updateOne({ a: 3 }, { $set: { b: 1 } });
	// console.log('Updated documents =>', updateResult);

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