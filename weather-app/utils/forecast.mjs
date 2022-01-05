import request from 'postman-request';

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=5dc3066bbd5e3574b039cf3cab61a8ac&query=${latitude},${longitude}&units=m`

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connet to weather service!', undefined)
		} else if (body.error) {
			callback('Please, Enter valid location!', undefined)
		} else {
			const temp = body.current.temperature;
			const tempFeelslike = body.current.feelslike;
			const weatherDescription = body.current.weather_descriptions[0]
			callback(undefined, {
				temp,
				tempFeelslike,
				weatherDescription,
				message: `${weatherDescription}. it is currently ${temp} degree out, But it feels like ${tempFeelslike} degree`
			})
		}
	})
}

export default forecast 