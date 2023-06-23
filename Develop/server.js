// import express & path 
const express = require('express');
const path = require('path');


// import notes router
const api = require('./routes/api.js');

// define port
const PORT = process.env.PORT || 3001;

// create instance of express named app
const app = express();

// middleware for json and urlencoded data 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// lets app access public folder and index.html
app.use(express.static('public'));

app.use('/api', api);

// sends user notes.html
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'/public/notes.html'));
});

// handles wildcard requests
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});


// Listens for requests at defined port
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});

