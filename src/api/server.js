const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const users = require('./routers/Users/userRouter.js'); 
const userAddresses = require('./routers/UserAddresses/addressesRouter.js');
const userPayments = require('./routers/UserPayments/paymentRouter.js');
const products = require('./routers/Products/productsRouter.js');
const discounts = require('./routers/Discounts/discountRouter.js');
const inventory = require('./routers/Inventory/inventoryRouter.js');
//add middleware to middleware file and import here if needed
const {}= require('./middleware/middleware.js');

//use body parser middleware
server.use(bodyParser.json());

//TODO: remove this render when done with simple
//logic
//tell server to use ejs to render temp page
server.set('view engine', 'ejs');

//user router
server.use('/users', users);
//userAddress router
server.use('/user_addresses', userAddresses);
//userPayments router
server.use('/user_payments', userPayments);
//products router
server.use('/products', products);
//discounts router
server.use('/discounts', discounts);
//inventory router
server.use('/inventory', inventory);

server.get('/', (req, res)=> {
    
    //the server automatically looks in views folder
    res.status(200).render("index");
})

//export the server instance to app.js
exports.server = server;
