import express, { request } from 'express';

import connectDB from './DB/mongoose.mjs';
import User from './Models/user.mjs';
import Task from './Models/task.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.post('/users', (req, res) => {
	const user = new User(req.body)
	user.save()
		.then(() => {
			res.status(201).send(user)
		})
		.catch((error) => {
			res.status(400).send()
		})
});

app.get('/users', (req, res) => {
	User.find({})
		.then((users) => {
			res.send(users)
		})
		.catch((error) => {
			res.status(500).send()
		})
});

app.get('/users/:id', (req, res) => {
	const _id = req.params.id;

	User.findById(_id)
		.then((user) => {
			if (!user) {
				return res.status(404).send()
			}

			res.send(user)
		})
		.catch((error) => {
			res.status(500).send()
		})
});

app.post('/tasks', (req, res) => {
	const task = new Task(req.body)
	task.save()
		.then(() => {
			res.status(201).send(task)
		})
		.catch((error) => {
			res.status(400).send(error)
		})
});

app.get('/tasks', (req, res) => {
	user.find({})
		.then(() => {

		})
		.catch(() => {
			res.status(500).send()
		})
});

app.listen(port, () => {
	console.log(`Port: ${port} now Is OnFire 🔥`)
});