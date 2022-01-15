import express from 'express';

import connectDB from './DB/mongoose.mjs';
import User from './Models/user.mjs'
import Task from './Models/task.mjs'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

connectDB()

app.post('/users', (req, res) => {
	const user = new User(req.body)
	user.save()
		.then(() => {
			res.send(user)
		})
		.catch((error) => {
		res.send(error).status(400)
		})
})

app.post('/tasks', (req, res) => {
	const task = new Task(req.body)
	task.save()
	.then(() => {
		res.send(task)

	})
	.catch((error) => {
		res.send(error).status(400)
	})
})

app.listen(port, () => {
	console.log(`Port: ${port} now Is OnFire 🔥`)
})