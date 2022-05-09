const dbConfig = require('../../config/db_config.js');
//import database components
const {
         
          errorMessage,
          checkIfConstraintErr

      } = require('../../api/components/DBComponents/dbComponents.js');

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
        
        //only server errors when DB error triggered for get method
        if(err){
           
           //add details to error message
           errorMessage.code = err.code;
           errorMessage.detail = err.detail;
            
           //send the error message to client
           response.status(500).json(errorMessage);

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
        //only server errors on DB error
        if(err){
            
            //add details to error message
            errorMessage.code = err.code;
            errorMessage.detail = err.detail;
            
            //send the error message to client
            response.status(500).json(errorMessage);
        }

        //send the results to client
        response.status(200).json(results.rows);
    });
}

//creates a new address
const createNewUserAddress = (request, response) => {
    
    //get data from request body
    const {
            
            addressLine1,
            addressLine2,
            city,
            postalCode,
            country,
            telephone,
            mobile,
            state

          } = request.body;

    //create query lin
    const queryLine = `INSERT INTO users.user_address
                       (
                           address_line_1,
                           address_line_2,
                           city,
                           postal_code,
                           country,
                           telephone,
                           mobile,
                           state
                       )

                       VALUES
                       (
                           ${"${addressLine1}"},
                           ${"${addressLine2}"},
                           ${"${city}"},
                           ${"${postalCode}"},
                           ${"${country}"},
                           ${"${telephone}"},
                           ${"${mobile}"},
                           ${"${state}"}
                       );`;

    //prepare the query statement
    const item = dbConfig.prep(queryLine);

    //create the item instance
    const itemInstance = item(
                                {
                                    addressLine1: addressLine1,
                                    addressLine2: addressLine2,
                                    city: city,
                                    postalCode: postalCode,
                                    country: country,
                                    telephone: telephone,
                                    mobile: mobile,
                                    state: state
                                }
                             );
    
    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        //error checking
        //on database error two cases arise
        //case 1: constraint violation
        //case 2: other error (server side)
        if(err){
            
            //multi cases mean multi status codes
            //assume server error first
            let statusCode = 500;

            //check if a contraint violation has been made
            if(checkIfConstraintErr(parseInt(err.code))){
                
                //set status code to invalid request
                statusCode = 400;

                //set error message text
                errorMessage.text = 'Client Error';
            }

            //set error message details
            errorMessage.code = err.code;
            errorMessage.detail = err.detail;
            
            //send the error message
            response.status(statusCode).json(errorMessage);
        }
        
        //send success code
        //TODO: send the new object
        response.status(202).json(results.rows);

    });
}


module.exports = {
    
    getUserAddresses: getUserAddresses,
    getUserAddressesById: getUserAddressesById,
    createNewUserAddress: createNewUserAddress
}
