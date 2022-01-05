import http from 'http';

const url = `http://api.weatherstack.com/current?access_key=5dc3066bbd5e3574b039cf3cab61a8ac&query=${30},${30}&units=m`

const request = http.request(url, (response) => {
	let data = '';
	response.on('data', (chunk) => {
		data += chunk.toString()
	})
	response.on('end', () => {
		const body = JSON.parse(data)
		console.log(body)
	})
})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()