import express, { request } from 'express';
import multer from 'multer';

import connectDB from './db/mongoose.mjs';
import usersRouter from './routers/user.mjs';
import tasksRouter from './routers/task.mjs';

const app = express();
const port = process.env.PORT || 3000;
connectDB();
// ------------------------

const upload = multer({
    dest: 'images'
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

// ------------------------
app.use(express.json());
app.use(usersRouter)
app.use(tasksRouter)

app.listen(port, () => {
	console.log(`Port: ${port} now Is OnFire 🔥`)
}); 

