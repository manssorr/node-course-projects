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