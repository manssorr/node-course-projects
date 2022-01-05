import request from 'postman-request';

const url = `http://api.weatherstack.com/current?access_key=5dc3066bbd5e3574b039cf3cab61a8ac&query=${30},${30}&units=m`
request({url: url, json: true}, (error, response) => {
	if(error){
		console.log('Unable to connet to weather service!')
	} else if(response.body.error) {
		console.log('Please, Enter valid location!')

	} else {		
		const temp = response.body.current.temperature;
		const tempFeelslike = response.body.current.feelslike;
		const weatherDes = response.body.current.weather_descriptions[0]
		console.log(`${weatherDes}. it is currently ${temp} degree out, But it feels like ${tempFeelslike} degree`);
	}
})

const lang = 'en'
const text = "1what12"
const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?limit=1&proximity=-73.990593%2C40.740121&language=${lang}&access_token=pk.eyJ1IjoibWFuc3NvcnIiLCJhIjoiY2t4d25maXZiM2VybjJwa285ZnVseTB4cSJ9.AUJb2GCxUh9XYDuMAuPZrA`
request({url: geocodeURL, json: true}, (error, response) => {
	if(error){
		console.log('Unable to connet to location service!')
	} else if(response.body.features.length === 0) {
		console.log("Can't find this place! Try another search")
	} else if(response.body.message) {
		console.log(message)
	} else {		
		const longitude = response.body.features[0].center[0];
		const latitude = response.body.features[0].center[1];
		console.log(latitude);
		console.log(longitude);
	}
})