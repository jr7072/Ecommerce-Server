const dbConfig = require('../../config/db_config.js');
const dbComponents = require('../../api/components/DBComponents/dbComponents.js');

//get methods for the address table
//gets all data from the user address table
const getUserAddresses = (request, response) => {
    
    //creating query string
    const queryString = `SELECT *
                         FROM users.user_address;`;

    //prepare the statement
    const item = dbConfig.prep(queryString);

    //run the query
    dbConfig.dbPool.query(item({}), (err, results) => {
        
        if(err){
           
           //create error message and send the error
           err.code ? dbComponents.errorMessage.code = err.code: null;
           err.detail ? dbComponents.errorMessage.detail = err.detail: null;

           response.status(404).json(dbComponents.errorMessage);

        }

        //send the rows of data
        response.status(200).json(results.rows);
    });
}

//get and address through id
const getUserAddressesById = (request, response) => {
    
    //get user ID from request
    const userID = request.params.id;

    //create the query string
    const queryString = `SELECT *
                         FROM users.user_address
                         WHERE id = ${"${userID}"};`;
    
    //prepare the statement
    const item = dbConfig.prep(queryString);
    
    //create query item instance
    const itemInstance = item(
                                {
                                    userID: userID
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        //error checking
        if(err){
            
            err.code ? dbComponents.errorMessage.code = err.code: null;
            err.detail ? dbComponents.errorMessage.detail = err.detail: null;
            
            response.status(404).json(dbComponents.errorMessage);
        }

        //send the results to client
        response.status(200).json(results.rows);
    });
}

module.exports = {
    
    getUserAddresses: getUserAddresses,
    getUserAddressesById: getUserAddressesById,
}
