const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

//Using hbs for dynamic pages
app.set('view engine', 'hbs');
//Rerister partials
hbs.registerPartials(path.join(__dirname, './partials'));

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
        title : 'Help title',
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

    if (!req.query.address){
        return res.send({
            error : 'You must provide an address from the route'
        });
    }

    res.send({
        forecast : 'It is snowing',
        location : 'Philly',
        address : req.query.address
    });
});

//Product page with query parameters
app.get('/products', (req,res) => {

    if (!req.query.search){
        return res.send({ //we return here because we want to stop  
            error: 'You must provide a search parameter'
        })
    }

    res.send({products:[]});
});

//404 page 
app.get('*', (req,res) => {
    res.render('error', {
        message : 'Error 404 : Not found'
    });
});

//Listen to port
app.listen(3000, () => { 
    console.log('Server is up');
});