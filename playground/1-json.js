const fs = require('fs');

const book = {
    title : 'Title of book',
    author : 'Me'
};

// //Convert object to JSON
 const bookJSON = JSON.stringify(book);
// console.log(bookJSON);

// //Convert JSON to object
// const bookObj = JSON.parse(bookJSON);
// console.log(book);

//Write json data to file
//fs.writeFileSync('1-json.json', bookJSON);

//Read from the file that we wrote, change a value and overwrite the file 
const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const dataObj = JSON.parse(dataJSON);

dataObj.title = "New title";
fs.writeFileSync('1-json.json', JSON.stringify(dataObj));