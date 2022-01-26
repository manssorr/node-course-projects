import express, { request } from 'express';
import multer from 'multer';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const upload = multer({
    dest: 'images'
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

app.listen(port, () => {
	console.log(`Port: ${port} now Is OnFire 🔥`)
}); 

