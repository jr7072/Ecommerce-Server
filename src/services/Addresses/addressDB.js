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
           dbComponents.errorMessage.code = err.code;
           dbComponents.errorMessage.detail = err.detail;

           response.status(404).json(dbComponents.errorMessage);

        }

        //send the rows of data
        response.status(200).json(results.rows);
    });
}

module.exports = {
    
    getUserAddresses: getUserAddresses,
}
