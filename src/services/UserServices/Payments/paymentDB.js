const dbConfig = require('../../../config/db_config.js');
//import database components
const {
          
          errorFunction

      } = require('../../../api/components/DBComponents/dbComponents.js');

//gets all user peyment data
const getUserPayments = (request, response) => {
    
    //create query string to pass to make a prepared statement
    const queryString = `SELECT *
                         FROM users.user_payment;`;

    //making a prepared statement to select users
    const item = dbConfig.prep(queryString);
    
    //run the query
    dbConfig.dbPool.query(item({}), (err, results) => {
        
        if(err){
            
            //handles db errors: look in component files
            errorFunction(response, err);
        }
        
        //send the rows
        response.status(200).json(results.rows);

    });   
}

//get user payment data by id
const getUserPaymentsById = (request, response) => {
    
    const paymentID = request.params.id;
    
    const queryString = `SELECT *
                         FROM users.user_payment
                         WHERE id = ${"${paymentID}"};`; 

    //making the prepared statement to get user data by id
    const item = dbConfig.prep(queryString);
    
    dbConfig.dbPool.query(item({paymentID: paymentID}), (err, results) => {
        
        if(err){
            
            //error handling function from components
            errorFunction(response, err);
        }

        response.status(200).json(results.rows);
    });

}

//created a new user payment
//supplies ID automatically
//adds data from body
const createUserPayments = (request, response) => {
    
    //collect the data from the body object
    const {
            paymentType,
            provider,
            accountNumber,
            expiry
           
          } = request.body;
    
    //apply case sensitivity
    const paymentTypeMod = paymentType.toLowerCase();
    const providerMod = provider.toLowerCase();

    //INSERT query string
    //inserts body parameters
    const queryString = `INSERT INTO
                         users.user_payment (
                                        
                                        payment_type,
                                        provider,
                                        account_number,
                                        expiry
                                    
                                    )
                         
                         VALUES (
                                    
                                    ${"${paymentType}"},
                                    ${"${provider}"},
                                    ${"${accountNumber}"},
                                    ${"${expiry}"}
                                
                                )

                         RETURNING *;`;
    
    //prep the query string
    const item = dbConfig.prep(queryString);
    
    //creating item instance for cleaner code
    const itemInstance = item( 
                                {
                                    paymentType: paymentTypeMod,
                                    provider: providerMod,
                                    accountNumber: accountNumber,
                                    expiry: expiry
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
    
            //error function from components
            errorFunction(response, err);
        }
        
        //return inserted data
        response.status(201).json(results.rows);

    })

}

//updates a user payment by id
const updateUserPaymentsById = (request, response) => {
    
    //collect user id from the request parameter
    const paymentID = request.params.id;

    //collect date from request body
    const {
            
            paymentType,
            provider,
            accountNumber,
            expiry
          
          } = request.body; 
    
    //this is to follow case sensitivity rules in the database server
    const paymentTypeMod = paymentType.toLowerCase();
    const providerMod = provider.toLowerCase();

    //create query string
    const queryString = `UPDATE users.user_payment
                         SET
                             payment_type = ${"${paymentType}"},
                             provider = ${"${provider}"},
                             account_number = ${"${accountNumber}"},
                             expiry = ${"${expiry}"}
                         WHERE id = ${"${paymentID}"}
                         RETURNING *;`;
    
    //prepare the statement
    const item = dbConfig.prep(queryString);

    //create item instance
    const itemInstance = item(
                                {
                                    paymentType: paymentTypeMod,
                                    provider: providerMod,
                                    accountNumber: accountNumber,
                                    expiry: expiry,
                                    paymentID: paymentID
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        

        if(err){
            
            //error function from components
            errorFunction(response, err);
            
        }
        
        //send successful updated data
        response.status(201).json(results.rows);

    });
           
}

//creating the delete method for a user payment
//deletes user payment provided an id
deleteUserPaymentsById = (request, response) => {
    
    //collect the paymentID from request
    const paymentID = request.params.id;

    //create the query string
    const queryString = `DELETE FROM users.user_payment
                         WHERE id = ${"${paymentID}"};`;
    
    //create prepared statement
    const item = dbConfig.prep(queryString);
    
    //plug data into statement
    const itemInstance = item(
                                {
                                    paymentID: paymentID
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
            
            //error function from components
            errorFunction(response, err);
        }
        
        //send success code
        response.status(204).send();
    });

}

module.exports = {

    getUserPayments: getUserPayments,
    getUserPaymentsById: getUserPaymentsById,
    createUserPayments: createUserPayments,
    updateUserPaymentsById: updateUserPaymentsById,
    deleteUserPaymentsById: deleteUserPaymentsById

}
