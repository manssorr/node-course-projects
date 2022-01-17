import mongoose from 'mongoose';

export default async function connectDB() {
	await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');
}

