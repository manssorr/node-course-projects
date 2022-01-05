setTimeout(() => {
	console.log('two seconds')
}, 2000);

const names = ['Mans', 'Nourhanne', 'Mahmoud', 'Ahmed'];
const shortName = names.filter(name => name.length <= 4)

const geocode = (address, callback) => {
	setTimeout(() => {
		const data = {
			latitude: 0,
			longitude: 0,
		}

		callback(data, address)
	}, 1000);
}

geocode('6th occtober', (data, addr) => {
	console.log(data, addr)
})


// Goal: Mess around with the callback pattern

// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!


const add = (num1, num2, callback) => {
	setTimeout(() => {
		callback(num1 + num2);
	}, 1000);
}
add(1, 4, (sum) => {
	console.log(sum) // Should print: 5
})
