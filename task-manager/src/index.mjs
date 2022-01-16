import express, { request } from 'express';

import connectDB from './DB/mongoose.mjs';
import User from './Models/user.mjs';
import Task from './Models/task.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.post('/users', async (req, res) => {
	const user = new User(req.body)

	try {
		await user.save()
		res.status(201).send(user)
	} catch (error) {
		res.status(400).send(error.message)
	}
});
app.get('/users', async (req, res) => {
	try {
		const users = await User.find({})
		res.send(users)
	} catch (error) {
		res.status(500).send()
	}
});
app.get('/users/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await User.findById(_id)
		if (!user) {
			return res.status(404).send()
		}
		res.send(user)
	} catch (error) {
		res.status(500).send()
	}
});
app.patch('/users/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' })
	}

	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

		if (!user) {
			return res.status(404).send()
		}

		res.send(user)
	} catch (error) {
		res.status(400).send(error)
	}
})
app.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);

		if(!user) {
			return res.status(404).send()
		};

		res.send(user);
	} catch (error) {
		res.status(500).send()
	}
})

app.post('/tasks', async (req, res) => {
	const task = new Task(req.body)
	try {
		await task.save()
		res.status(201).send(task)
	} catch (error) {
		res.status(400).send(error)
	}
});
app.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find({})
		res.send(tasks)
	} catch (error) {
		res.status(500).send()
	}
});
app.get('/tasks/:id', async (req, res) => {
	const _id = req.params.id
	console.log(_id)
	try {
		const task = await Task.findById({ _id })
		if (!task) {
			return res.status(404).send(task)
		}
		res.send(task)
	} catch (error) {
		res.status(500).send()
	}
});
app.patch('/tasks/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['description', 'completed']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' })
	}

	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

		if (!task) {
			return res.status(404).send()
		}

		res.send(task)
	} catch (error) {
		res.status(400).send(error)
	}
})
app.delete('/tasks/:id', async (req, res) => {
	const _id = req.params.id
	try {
		const task = await Task.findByIdAndDelete(_id);

		if(!task) {
			return res.status(404).send()
		};

		res.send(task);
	} catch (error) {
		res.status(500).send()
	}
})

app.listen(port, () => {
	console.log(`Port: ${port} now Is OnFire 🔥`)
});