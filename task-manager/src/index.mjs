import express, { request } from 'express';
import connectDB from './DB/mongoose.mjs';
import usersRouter from './routers/users.mjs';
import tasksRouter from './routers/tasks.mjs';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(usersRouter)
app.use(tasksRouter)

connectDB();

app.listen(port, () => {
	console.log(`Port: ${port} now Is OnFire 🔥`)
});