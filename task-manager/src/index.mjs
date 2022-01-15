import express from 'express';

import connectDB from './DB/mongoose.mjs';
import User from './Models/user.mjs'
import Task from './Models/task.mjs'


connectDB()

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.post('/users', (req, res) => {
	const user = new User(req.body)

	user.save()
		.then(res.send(user))
		.catch(console.error)
})

app.listen(port, () => {
	console.log(`Port: ${port} now Is OnFire 🔥`)
})