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

const note = notes();
console.log(note);

//Importing mpm modules
const validator = require('validator');
const chalk = require('chalk');

console.log(validator.isEmail('ted@gmail.com'));
console.log(chalk.bold.green('Changing the console colour'));
