const fs = require('fs');
const chalk = require('chalk');

const getNotes = function(){
    return "Your notes...";
}

const addNote = function(title,body){
    const notes = loadNotes();

    //Filter the array so it does not save duplicate titles 
    const duplNotes = notes.filter(function(note){
        return note.title === title;
    });

    if (duplNotes.length === 0){
        notes.push({
            title: title,
            body : body
        });
    
        fs.writeFileSync('notes.json', JSON.stringify(notes));
        console.log("New note added");
    }  else {
        console.log("Note title exists");
    }
}

const removeNote = function(title){
    const notes = loadNotes();
    const notesToKeep = notes.filter(function(note){
        return note.title !== title;
    });

    if (notes.length === notesToKeep.length){
        console.log(chalk.red.inverse("note could not be deleted"));
    } else {
        fs.writeFileSync('notes.json', JSON.stringify(notesToKeep));
        console.log(chalk.green.inverse("note deleted"));
    } 
}

const loadNotes = function(){
    try {
        const data = fs.readFileSync('notes.json');
        const dataJSON = data.toString();
        return JSON.parse(dataJSON);
    } catch(e){
        return [];
    }
}

module.exports = {getNotes, addNote, removeNote};