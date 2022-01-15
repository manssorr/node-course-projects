import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.post('/users', (req, res) => {
	console.log(req.body);
	res.send('testing ya m3lm 🧪')
})

app.listen(port, () => {
	console.log(`Port: ${port} now Is OnFire2 🔥`)
})