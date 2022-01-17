import express, { request } from 'express';
import connectDB from './db/mongoose.mjs';
import usersRouter from './routers/user.mjs';
import tasksRouter from './routers/task.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
	if(req.method === 'GET') {
		res.send('GET requests are desibled 😛');
	} else {
		next()
	}
})

app.use((req, res, next) => {
	res.status(503).send('قافلين النهارده يا عمنا ✨');
})

app.use(express.json());
app.use(usersRouter)
app.use(tasksRouter)

connectDB();


// import jwt from 'jsonwebtoken';

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }

// myFunction()


app.listen(port, () => {
	console.log(`Port: ${port} now Is OnFire 🔥`)
}); 