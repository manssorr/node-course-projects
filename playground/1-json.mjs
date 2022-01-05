import * as fs from 'fs';

// const book = {
// 	title: 'Time management',
// 	auther: 'Mansour'
// }

// const bookJSON = JSON.stringify(book);
// const parsedData= JSON.parse(bookJSON);

// fs.writeFileSync('1-json.json', bookJSON )
const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON =  dataBuffer.toString()
const dataOriginal = JSON.parse(dataJSON)

// console.log(bookJSON);
// console.log(parsedData.auther);
console.log(dataOriginal.title);
