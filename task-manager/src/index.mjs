import express, { request } from 'express';
import connectDB from './db/mongoose.mjs';
import usersRouter from './routers/user.mjs';
import tasksRouter from './routers/task.mjs';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(usersRouter)
app.use(tasksRouter)

connectDB();


import jwt from 'jsonwebtoken';

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

myFunction()


app.listen(port, () => {
	console.log(`Port: ${port} now Is OnFire 🔥`)
}); 