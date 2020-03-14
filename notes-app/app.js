//Importing core modules
//If we want to use a module we have to import it first
// const fs = require('fs');

// fs.writeFileSync('notes.txt','Some random text.');

//If we want to append to the previous file we use : 
// fs.appendFileSync('notes.txt',' Appending some new text');

//Importing our own modules 
//const name = require('./myModule');

//console.log(name);

// const add = require('./myModule');
const notes = require('./notes'); 

// const sum = add(1,2);
// console.log(sum);

// const note = notes();
// console.log(note);

//Importing mpm modules
const validator = require('validator');
const chalk = require('chalk');

console.log(validator.isEmail('ted@gmail.com'));
console.log(chalk.bold.green('Changing the console colour to green'));

//GETTING INPUT FROM USER -- node nameofapp arguments
//console.log(process.argv[2]);

//GETTING INPUT FROM USER using yargs package
const yargs = require('yargs');
//console.log(process.argv);

//Create add,remove,list and read commands 
yargs.command({
    command : 'add',
    describe : 'Add a new note',
    builder : {
        title : {
            describe : 'Note title'
        },
        body : {
            describe : 'Note body'
        }
    },
    handler : function(argv){
        //console.log('Title : ' + argv.title + ' with body : ' + argv.body); 
        notes.addNote(argv.title, argv.body);
    }
});
yargs.command({
    command : 'remove',
    describe : 'remove a new note',
    builder : {
        title : {
            describe : 'Note title'
        }
    },
    handler : function(argv){
        notes.removeNote(argv.title);
    }
});
yargs.command({
    command : 'list',
    describe : 'list a new note',
    handler : function(){
        console.log('list a new note');
    }
});
yargs.command({
    command : 'read',
    describe : 'read a new note',
    handler : function(){
        console.log('read a new note');
    }
});

console.log(yargs.argv);
