const express = require('express');

//How to serve static files 
const path = require('path');

const app = express();

//Using hbs for dynamic pages
app.set('view engine', 'hbs');

//How to serve static files 
app.use(express.static(path.join(__dirname, '../public')));

//Home page route
//Render the hbs (dynamic) page
app.get('/', (req,res) => {
    res.render('index', {
        title:'Test title'
    });
});

//Help page 
app.get('/help', (req,res) => {
    res.render('help', {
        message : 'This a help paragraph'
    });
});

//About page 
app.get('/about', (req,res) => {
    res.render('about',{
        title : 'Dynamic about page test' 
    });
});

//Weather page 
app.get('/weather', (req,res) => {
    res.send('Weather page');
});

//Listen to port
app.listen(3000, () => {
    console.log('Server is up');
});