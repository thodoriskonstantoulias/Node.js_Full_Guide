const express = require('express');

//How to serve static files 
const path = require('path');

const app = express();

//How to serve static files 
app.use(express.static(path.join(__dirname, '../public')));

//Home page route
app.get('/', (req,res) => {
    res.send('Hello express!!!');
});

//Help page 
app.get('/help', (req,res) => {
    res.send('Help page');
});

//About page 
app.get('/about', (req,res) => {
    res.send('About page');
});

//Weather page 
app.get('/weather', (req,res) => {
    res.send('Weather page');
});

//Listen to port
app.listen(3000, () => {
    console.log('Server is up');
});