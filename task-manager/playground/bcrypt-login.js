import bcrypt from 'bcryptjs';

const myFunction = async () => {
    const password = 'Mans12345!'
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('Mans12345!', hashedPassword)
    console.log(isMatch)
}

myFunction()