// Setup routers
import express from 'express';
import User from '../models/user.js';
const router = express.Router();
import auth from '../middleware/auth.mjs'

// Signup
router.post('/users', async (req, res) => {
	const user = new User(req.body)

	try {
		await user.save()
		const token = await user.generateAuthToken()
		res.status(201).send({ user, token })
	} catch (error) {
		res.status(400).send(error.message)
	}
});

// Login
router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken()

		res.send({ user, token });
	} catch (error) {
		res.status(400).send(error.message)
	}
})

// Logout
router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
		await req.user.save()
		res.send()
	} catch (error) {
		res.status(500).send()
	}
})

// LogoutAll
router.post('/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = []
		await req.user.save()
		res.send()
	} catch (error) {
		res.status(500).send()
	}
})
            
// Show Profile
router.get('/users/me', auth, async (req, res) => {
	res.send(req.user)
});

// Show user by id
router.get('/users/:id', async (req, res) => {
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

// Update user by id
router.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' })
	}
	try {
		updates.forEach((update) => req.user[update] = req.body[update])
		await req.user.save()

		res.send(req.user)
	} catch (error) {
		res.status(400).send(error)
	}
});

// Remove user by id
router.delete('/users/me', auth, async (req, res) => {
	try {
		await req.user.remove()
		res.send(req.user);
	} catch (error) {
		res.status(500).send()
	}
})

export default router;