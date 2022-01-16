import express, { request } from 'express';

import connectDB from './DB/mongoose.mjs';
import User from './Models/user.mjs';
import Task from './Models/task.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use()

connectDB();



app.listen(port, () => {
	console.log(`Port: ${port} now Is OnFire 🔥`)
});