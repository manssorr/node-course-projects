const Salam = (name = 'Akhy', type = 'male') => {
	type === 'male' ? console.log(`Al-Salam Alykom ${name}`) : console.log('Not Allowed to greeting women')
}

Salam('mansour', 'male')
Salam('mansour', undefined)
Salam(undefined, 'male')
Salam('nourhanne', 'female')
Salam(undefined, 'female')