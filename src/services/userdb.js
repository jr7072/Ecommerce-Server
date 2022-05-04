const dbConfig = require('../services/userdb.js');

//create a defualt error message
const errorMessage = {
    
    text: 'There was an error in our part'
};

//gets all user date except passwords and analytic data
const getUsers = (request, body) => {
    
    //create query string to pass to make a prepared statement
    const queryString = `SELECT id, username, first_name, last_name
                            FROM users.user`;

    //making a prepared statement to select users
    const item = dbConfig.prep(queryString);
    
    //run the query
    dbConfig.dbPool.query(item({}), (err, results) => {
        
        if(err){
            
            //send error response
            response.status(500).json(errorMessage);
        }
        
        //send the rows
        response.status(200).json(results.rows);

    });   
}

//get user data by id
const getUserById = (request, response) => {
    
    const userID = request.params.id;
    
    const queryString = `SELECT id, username, first_name, last_name
                            FROM users.user
                            WHERE id=${"${id}"};`; 

    //making the prepared statement to get user data by id
    const item = dbConfig.prep(queryString);
    
    dbConfig.dbPool.query(item({id:userID}), (err, results) => {
        
        if(err){
            
            //send error reponse
            response.status(500).json(errorMessage);
        }

        response.status(200).json(results.rows);
    }

}

module.exports = {

    getUsers: getUsers,
    getUserById = getUserById

}
