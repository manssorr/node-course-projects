import * as fs from 'fs';
import chalk from 'chalk'

const saveNotes = (data) => {
	const dataJSON = JSON.stringify(data)
	fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (error) {
		return []
	}
}

const addNote = (title, body) => {
	const notes = loadNotes()
	const duplicatedNote = notes.find((note) => note.title === title)
	if (!duplicatedNote) {
		notes.push({
			title,
			body
		})
		saveNotes(notes)
		console.log(chalk.inverse.green('New note added!'))
	} else {
		console.log(chalk.inverse.red('This note is exist!'))
	}
}

const removeNote = (title) => {
	const notes = loadNotes()
	const notesToKeep = notes.filter(note => note.title !== title);

	if (notesToKeep.length < notes.length) {
		saveNotes(notesToKeep)
		console.log(chalk.inverse.green("Note removed successfuly!"))
	} else {
		console.log(chalk.inverse.red("Can't find this note"))
	}
}

const listNote = () => {
	const notes = loadNotes()
	console.log(chalk.blueBright.inverse('*Your Notes*'))
	notes.forEach(note => {
		console.log(`Note title: ${note.title}`)
	});
}

const readNote = (title) => {
	const notes = loadNotes()
	const note = notes.find(note => note.title === title)
	if(note) {
		console.log(chalk.cyanBright.inverse(note.title))
		console.log(chalk.yellowBright.inverse(note.body))
	} else {
		console.log(chalk.red.inverse("Can't find it"))
	}
}

export {
	addNote,
	removeNote,
	listNote,
	readNote,
}