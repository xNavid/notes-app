const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.find(note => note.title === title)
    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note added successfully!'))
    }
    else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title)
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed sucessfully!'))
        saveNotes(notesToKeep)
    }
    else {
        console.log(chalk.red.inverse('No note found!'))
    }
}
const listNotes = () => {
    const notes = loadNotes()
    console.log('Your notes')
    notes.forEach(note => console.log(note.title));
}
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)
    if (note) {
        console.log(note.title)
        console.log(note.body)
    }
    else {
        console.log(chalk.red.inverse('No note found!'))
    }
}
const saveNotes = note => fs.writeFileSync('notes.json', JSON.stringify(note))
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson) 
    } catch (error) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}