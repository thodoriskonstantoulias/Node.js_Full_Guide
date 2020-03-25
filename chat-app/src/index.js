//Here we will create our real time chat app
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

//How to serve static files 
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
    console.log('Listening to port ' + port);
}); 