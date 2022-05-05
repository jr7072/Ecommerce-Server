const dbConfig = require('../config/db_config.js');

//create a defualt error message
const errorMessage = {
    
    text: 'There was an error in our part'
};

//gets all user date except passwords and analytic data
const getUsers = (request, response) => {
    
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
                            WHERE username=${"${id}"};`; 

    //making the prepared statement to get user data by id
    const item = dbConfig.prep(queryString);
    
    dbConfig.dbPool.query(item({id:userID}), (err, results) => {
        
        if(err){
            
            //send error reponse
            response.status(500).json(errorMessage);
        }

        response.status(200).json(results.rows);
    });

}

//created a new user
//supplies ID automatically
//adds data from body
//creates datestamp in db server
const createNewUser = (request, response) => {
    
    //collect the data from the body object
    const {
            username,
            password,
            firstName,
            lastName,
           
          } = request.body;
    
    //INSERT query string
    //inserts body parameters
    const queryString = `INSERT INTO
                         users.user (
                                        
                                        username,
                                        password,
                                        first_name,
                                        last_name,
                                        created_at
                                    
                                    )
                         
                         VALUES (
                                    
                                    ${"${username}"},
                                    ${"${password}"},
                                    ${"${firstName}"},
                                    ${"${lastName}"},
                                    now()
                                
                                );`;
    
    //prep the query string
    const item = dbConfig.prep(queryString);
    
    //creating item instance for cleaner code
    const itemInstance = item( 
                                {
                                    username: username,
                                    password: password,
                                    firstName: firstName,
                                    lastName: lastName
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
            
            //custom error text  
            err.code == 23505 ? errorMessage.text = "client error": null;
            
            //adds details for the error
            //in the error message
            errorMessage.code = err.code;
            errorMessage.detail = err.detail;

            response.status(400).json(errorMessage);
        }
        
        //send success code
        response.status(202).send();
    })

}

module.exports = {

    getUsers: getUsers,
    getUserById: getUserById,
    createNewUser: createNewUser

}