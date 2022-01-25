// Setup routers
import express from 'express';
import User from '../models/user.js';
const router = express.Router();
import auth from '../middleware/auth.mjs'
import multer from 'multer';
import sharp from'sharp';
import { sendWelcomeEmail, sendCancelationEmail } from '../emails/account';

// Signup
router.post('/users', async (req, res) => {
	const user = new User(req.body)

	try {
		await user.save();
		sendWelcomeEmail(user.email, user.name);
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// Login
router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();

		res.send({ user, token });
	} catch (error) {
		res.status(400).send(error.message);
	}
})

// Logout
router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
		await req.user.save();
		res.send();
	} catch (error) {
		res.status(500).send();
	}
})

// LogoutAll
router.post('/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = []
		await req.user.save();
		res.send();
	} catch (error) {
		res.status(500).send();
	}
})

// Show Profile
router.get('/users/me', auth, async (req, res) => {
	res.send(req.user);
});

// Show user by id
router.get('/users/:id', async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await User.findById(_id)
		if (!user) {
			return res.status(404).send();
		}
		res.send(user)
	} catch (error) {
		res.status(500).send();
	}
});

// Update user by id
router.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password', 'age']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}
	try {
		updates.forEach((update) => req.user[update] = req.body[update]);
		await req.user.save();

		res.send(req.user);
	} catch (error) {
		res.status(400).send(error)
	}
});

// Remove user by id
router.delete('/users/me', auth, async (req, res) => {
	try {
		await req.user.remove();
		res.send(req.user);
	} catch (error) {
		res.status(500).send();
	}
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Please upload an image'));
        }

        callback(undefined, true);
    }
})


router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer;
    await req.user.save();
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

export default router;