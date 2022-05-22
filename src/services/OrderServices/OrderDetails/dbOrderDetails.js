//import the database config file
const dbConfig = require('../../../config/db_config.js');
//import database components
const {
    
    errorFunction

} = require('../../../api/components/DBComponents/dbComponents.js');

//create the get method for all data on the order details table
const getOrderDetails = (request, response) => {
    
    //create the query string
    const queryString = `SELECT 
                             id,
                             user_id,
                             total,
                             payment_id
                         FROM order_cycle.order_details;`;
    
    //prep the string
    const item = dbConfig.prep(queryString);
    
    //run the query
    dbConfig.dbPool.query(item({}), (err, results) => {
        
        if(err){
            
            //error function from components
            errorFunction(response, err);
            return;
        }

        //send the data and status code
        response.status(200).json(results.rows);
    });
}

//create a get method to return data based on given id
const getOrderDetailsById = (request, response) => {
    
    //get the id from the request parameter
    const orderDetailsID = request.params.id;

    //create the query string
    const queryString = `SELECT
                             id,
                             user_id,
                             total,
                             payment_id
                         FROM order_cycle.order_details
                         WHERE id = ${"${orderDetailsID}"};`;

    //prep the string
    const item = dbConfig.prep(queryString);
    
    //create the item instance
    const itemInstance = item(
                                 {
                                     orderDetailsID: orderDetailsID
                                 }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
            
            //error function from components
            errorFunction(response, err);
            return;
        }

        //send back the data and status code
        response.status(200).json(results.rows); 
    });
}

const createOrderDetails = (request, response) => {
    
    //get data from request body
    const {
        
        userID,
        total,
        paymentID

    } = request.body;

    //create the query string
    const queryString = `INSERT INTO order_cycle.order_details
                         (
                             user_id,
                             total,
                             payment_id,
                             created_at
                         )
                         VALUES
                         (
                             ${"${userID}"},
                             ${"${total}"},
                             ${"${paymentID}"},
                             now()
                         )
                         RETURNING
                             id,
                             user_id,
                             total,
                             payment_id;`;

    //prep the string
    const item = dbConfig.prep(queryString);

    //create item instance
    const itemInstance = item(
                                 {
                                     userID: userID,
                                     total: total,
                                     paymentID: paymentID
                                 }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){

            //error function from components
            errorFunction(response, err);
            return;
        }

        //send back the inserted data
        response.status(201).json(results.rows);
    });
}

//update data for order details
const updateOrderDetailsById = (request, response) => {
    
    //get the order details id from request
    const orderDetailsID = request.params.id;

    //get data from body
    const {
        
        userID,
        total,
        paymentID

    } = request.body;

    //create the query string
    const queryString = `UPDATE order_cycle.order_details
                         SET
                             user_id = ${"${userID}"},
                             total = ${"${total}"},
                             payment_id = ${"${paymentID}"}
                         WHERE id = ${"${orderDetailsID}"}
                         RETURNING
                             id,
                             user_id,
                             total,
                             payment_id;`;

    //prep the string
    const item = dbConfig.prep(queryString);

    //create the item instance
    const itemInstance = item(
                                 {
                                     userID: userID,
                                     total: total,
                                     paymentID: paymentID,
                                     orderDetailsID: orderDetailsID
                                 }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
            
            //error function from components
            errorFunction(response, err);
            return;
        }

        //send back updated data
        response.status(201).json(results.rows);
    });
}

//create the delete method for order details
const deleteOrderDetailsById = (request, response) => {
    
    //get the id from request
    const orderDetailsID = request.params.id;

    //create query string
    const queryString = `DELETE FROM order_cycle.order_details
                         WHERE id = ${"${orderDetailsID}"};`;

    //prep the string
    const item = dbConfig.prep(queryString);

    //create item instance
    const itemInstance = item(
                                 {
                                     orderDetailsID: orderDetailsID
                                 }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
            
            //error function from components
            errorFunction(response, err);
            return;
        }

        //send back status
        response.status(204).send();
    });
}

//export the functions
module.exports = {
    
    getOrderDetails: getOrderDetails,
    getOrderDetailsById: getOrderDetailsById,
    createOrderDetails: createOrderDetails,
    updateOrderDetailsById: updateOrderDetailsById,
    deleteOrderDetailsById: deleteOrderDetailsById
}
