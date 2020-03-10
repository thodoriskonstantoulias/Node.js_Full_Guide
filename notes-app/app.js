//If we want to use a module we have to import it first
const fs = require('fs');

fs.writeFileSync('notes.txt','Some random text.');

//If we want to append to the previous file we use : 
fs.appendFileSync('notes.txt',' Appending some new text');