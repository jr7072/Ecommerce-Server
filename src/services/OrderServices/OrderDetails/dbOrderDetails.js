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

//export the functions
module.exports = {
    
    getOrderDetails: getOrderDetails,
    getOrderDetailsById: getOrderDetailsById

}
