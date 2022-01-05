import request from 'postman-request';
import geocode from './utils/geocode.mjs';
import forecast from './utils/forecast.mjs';

const address = process.argv[2]
if (!address) {
	console.log('Please, Write an address after name of file!')
} else {
	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return console.log(error)
		}
		forecast(latitude, longitude, (error, { message }) => {
			if (error) {
				return console.log(error)
			}
			console.log(location)
			console.log(message)
		})
	});
}