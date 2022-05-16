const dbConfig = require('../../../config/db_config.js');
//import database components
const {
         
          errorFunction
      } = require('../../../api/components/DBComponents/dbComponents.js');

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
            
            //error function from components
            errorFunction(response, err);
        }

        //send the rows of data
        response.status(200).json(results.rows);
    });
}

//get and address through id
const getUserAddressesById = (request, response) => {
    
    //get address ID from request
    const addrID = request.params.id;

    //create the query string
    const queryString = `SELECT *
                         FROM users.user_address
                         WHERE id = ${"${addrID}"};`;
    
    //prepare the statement
    const item = dbConfig.prep(queryString);
    
    //create query item instance
    const itemInstance = item(
                                {
                                    addrID: addrID
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        //error checking
        //only server errors on DB error
        if(err){
            
            //error function from components
            errorFunction(response, err);
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
                       )
                       
                       RETURNING *;`;

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
        
        if(err){

            //error function from components
            errorFunction(response, err); 
        }
        
        //send created row
        response.status(201).json(results.rows);

    });
}

//modify and address row
const updateAddressById = (request, response) => {
    
    //get the address id from request
    const addrID = request.params.id;

    //get the values from the body of the request
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

    //create the query string
    const queryString = `UPDATE users.user_address
                         SET 
                            address_line_1 = ${"${addressLine1}"},
                            address_line_2 = ${"${addressLine2}"},
                            city = ${"${city}"},
                            postal_code = ${"${postalCode}"},
                            country = ${"${country}"},
                            telephone = ${"${telephone}"},
                            mobile = ${"${mobile}"},
                            state = ${"${state}"}
                        WHERE id = ${"${addrID}"}
                        RETURNING *;`;

    //prep the query
    const item = dbConfig.prep(queryString);

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
                                    state, state,
                                    addrID: addrID
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
            
            //error function from components
            errorFunction(response, err);
        }
        
        //send back updated address
        response.status(201).json(results.rows); 
    });

}

//create delete method
//deletes by ID
const deleteAddressById = (request, response) => {
    
    //get the addressId from request
    const addrID = request.params.id;

    //create the queryString
    const queryString = `DELETE FROM users.user_address
                         WHERE id = ${"${addrID}"};`;

    //prepe the query string
    const item = dbConfig.prep(queryString);

    //creat item instance
    const itemInstance = item(
                                {
                                    addrID: addrID
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        //error handling
        //server error is possible
        if(err){
            
            //error function from components
            errorFunction(response, err);
        }
        
        
        response.status(204).send();
    });

}

module.exports = {
    
    getUserAddresses: getUserAddresses,
    getUserAddressesById: getUserAddressesById,
    createNewUserAddress: createNewUserAddress,
    updateAddressById: updateAddressById,
    deleteAddressById: deleteAddressById 
}
