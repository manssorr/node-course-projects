import express, { request } from 'express';
import connectDB from './db/mongoose.mjs';
import usersRouter from './routers/user.mjs';
import tasksRouter from './routers/task.mjs';

const app = express();
const port = process.env.PORT || 3000;
connectDB();
// ------------------------

// ------------------------
app.use(express.json());
app.use(usersRouter)
app.use(tasksRouter)

app.listen(port, () => {
	console.log(`Port: ${port} now Is OnFire 🔥`)
}); 

