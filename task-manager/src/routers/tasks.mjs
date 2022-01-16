// Setup routers
import express from 'express';
import Task from '../Models/task.mjs';
const router = express.Router()

router.post('/tasks', async (req, res) => {
	const task = new Task(req.body)
	try {
		await task.save()
		res.status(201).send(task)
	} catch (error) {
		res.status(400).send(error)
	}
});
router.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find({})
		res.send(tasks)
	} catch (error) {
		res.status(500).send()
	}
});
router.get('/tasks/:id', async (req, res) => {
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
router.patch('/tasks/:id', async (req, res) => {
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
router.delete('/tasks/:id', async (req, res) => {
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

export default router;