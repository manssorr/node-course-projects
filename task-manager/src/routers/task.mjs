// Setup routers
import express from 'express';
import Task from '../models/task.mjs';
import auth from '../middleware/auth.mjs'
const router = express.Router()

router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		Owner: req.user._id,
	})
	try {
		await task.save()
		res.status(201).send(task)
	} catch (error) {
		res.status(400).send(error)
	}
});
router.get('/tasks', async (req, res) => {
	try {
		await req.user.populate('tasks').execPopulate()
		res.send(req.user.tasks)
	} catch (error) {
		res.status(500).send()
	}
});
router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id
	try {
		const task = await Task.findOne({ _id, owner: req.user._id })
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
		const task = await Task.findById(req.params.id)
		updates.forEach((update) => task[update] = req.body[update])
		await task.save()

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

		if (!task) {
			return res.status(404).send()
		};

		res.send(task);
	} catch (error) {
		res.status(500).send()
	}
})

export default router;