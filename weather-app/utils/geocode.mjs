import request from 'postman-request';

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&proximity=-73.990593%2C40.740121&access_token=pk.eyJ1IjoibWFuc3NvcnIiLCJhIjoiY2t4d25maXZiM2VybjJwa285ZnVseTB4cSJ9.AUJb2GCxUh9XYDuMAuPZrA`

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connet to location service!', undefined)
		}
		else if (body.features.length === 0) {
			callback("Can't find this place! Try another search", undefined)
		}
		else if (body.message) {
			callback(message, undefined)
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			})
		}
	})
}

export default geocode 