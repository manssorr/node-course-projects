// import module libraries from node package manager
import yargs from 'yargs'
import chalk from 'chalk'
import * as notes from './notes.mjs'

// Yargs stored version number
const y = yargs()
y.version('1.1.0')

// --- ADD COMMAND ----
y.command({
    command: 'add',
    describe: 'Have Jenkins add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note content',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log(`Your title is: ${argv.title}`)
        console.log(`Your body is: ${argv.body}`)
        notes.addNote(argv.title, argv.body)
    }
})

// --- REMOVE COMMAND ----
y.command({
    command: 'remove',
    describe: 'Have Jenkins remove an existing note',
    builder: {
        title: {
            describe: 'Note to be deleted',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// --- READ COMMAND ----
y.command({
    command: 'read',
    describe: 'Have Jenkins read your notes',
    builder: {
        title: {
            describe: 'Note to read',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

// --- LIST COMMAND ----
y.command({
    command: 'list',
    describe: 'Have Jenkins list your notes',
    handler() {
        notes.listNote()
    }
})

y.parse(process.argv.slice(2))
