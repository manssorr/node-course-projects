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

import Task from './models/user.js';
import User from './models/task.js';

const main = async () => {
    // const task = await Task.findById('5c2e505a3253e18a43e612e6')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user = await User.findById('5c2e4dcb5eac678a23725b5b')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
}

main()