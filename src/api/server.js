const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const users = require('./routers/Users/userRouter.js'); 
const userAddresses = require('./routers/Addresses/addressesRouter.js');

//use body parser middleware
server.use(bodyParser.json());

//TODO: remove this render when done with simple
//logic
//tell server to use ejs to render temp page
server.set('view engine', 'ejs');

//user router
server.use('/users', users);
//userAddress router
server.use('/userAddresses', userAddresses);

server.get('/', (req, res)=> {
    
    //the server automatically looks in views folder
    res.status(200).render("index");
})

//export the server instance to app.js
exports.server = server;

