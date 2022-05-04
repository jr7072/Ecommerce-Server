const express = require('express');
const bodyParser = require('body-parser');
const server = express();

//use body parser middleware
app.use(bodyParser.json());

//TODO: remove this render when done with simple
//logic
//tell server to use ejs to render temp page
server.set('view engine', 'ejs');

server.get('/', (req, res)=> {
    
    //the server automatically looks in views folder
    res.status(200).render("index");
})

//export the server instance to app.js
exports.server = server;

