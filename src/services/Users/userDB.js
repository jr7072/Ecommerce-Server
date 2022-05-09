const dbConfig = require('../../config/db_config.js');
//import database components
const {
          
          errorMessage,
          checkIfConstraintErr

      } = require('../../api/components/DBComponents/dbComponents.js');

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
            
            //sets the error code and error detail
            //to the error message component
            errorMessage.err = err.code;
            errorMessage.detail = err.detail;
            
            //error on datebase is at our expense during a get method
            //thus, status code is 500
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
                            WHERE id = ${"${id}"};`; 

    //making the prepared statement to get user data by id
    const item = dbConfig.prep(queryString);
    
    dbConfig.dbPool.query(item({id:userID}), (err, results) => {
        
        if(err){
            
            //the error on a get is always on server side
            errorMessage.code = err.code;
            errorMessage.detail = err.detail;

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
    
    //first name and last name is case sensitive on db
    const firstNameMod = firstName.toLowerCase();
    const lastNameMod = lastName.toLowerCase();

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
                                    firstName: firstNameMod,
                                    lastName: lastNameMod
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        //when a db error happens on creation two cases arise
        //case 1: a constraint is violated
        //case 2: db server side error occured
        if(err){
            
            //cases indicate multi status possibilities
            let statusCode = 500;

            //custom error text  
            //the component function checks if the err code is a contraint
            //error
            //if so, the text is then converted to indicate a client error
            if(checkIfConstraintErr(parseInt(err.code))) {
                
                //set status for invalid request
                statusCode = 400;

                //set the text of the errorMessage
                errorMessage.text = 'Client Error';
            }
           
            //adds details for the error
            //in the error message
            errorMessage.code = err.code;
            errorMessage.detail = err.detail;

            response.status(statusCode).json(errorMessage);
        }
        
        //send success code
        //TODO: send the new object
        response.status(202).send();
    })

}

//updates a user by id
//can update username, password, first name, and last name
const updateUser = (request, response) => {
    
    //collect user id from the request parameter
    const userID = request.params.id;

    //collect date from request body
    const {
            
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName
          
          } = request.body; 
    
    //this is to follow case sensitivity rules in the database server
    const firstNameMod = firstName.toLowerCase();
    const lastNameMod = lastName.toLowerCase();

    //create query string
    const queryString = `UPDATE users.user
                         SET
                             username = ${"${username}"},
                             password = ${"${password}"},
                             first_name = ${"${firstName}"},
                             last_name = ${"${lastName}"}
                         WHERE id = ${"${userID}"};`;
    
    //prepare the statement
    const item = dbConfig.prep(queryString);

    //create item instance
    const itemInstance = item(
                                {
                                    username: username,
                                    password: password,
                                    firstName: firstNameMod,
                                    lastName: lastNameMod,
                                    userID: userID
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        

        //again two cases arise when it comes to error given by DB
        //case1: contraint error
        //case2: other error which is a server error
        if(err){
            
            //multicase means multi status codes
            //assume server error first
            let statusCode = 500;
            
            //check if a contraint violation has been made
            if(checkIfConstraintErr(parseInt(err.code))){
                
                //set status code to invalid request
                statusCode = 400;

                //set the text to client error
                errorMessage.text = 'Client Error';

            }
            
            
            //set info to error message
            errorMessage.code = err.code;
            errorMessage.detail = err.detail;
            
            //send the error message
            response.status(statusCode).json(errorMessage);
        }
        
        //send successful put
        //TODO: return the updated object
        response.status(202).send();

    });
           
}

//creating the delete method for a user
deleteUserById = (request, response) => {
    
    //collect the userID from request
    const userID = request.params.id;

    //create the query string
    const queryString = `DELETE FROM users.user
                         WHERE id = ${"${userID}"};`;
    
    //create prepared statement
    const item = dbConfig.prep(queryString);
    
    //plug data into statement
    const itemInstance = item(
                                {
                                    userID: userID
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        //server error occurs here always
        //later authentication will be added
        if(err){
            

            errorMessage.code = err.code
            errorMessage.detail = err.detail;

            response.status(500).json(errorMessage);
        }
        
        //send success code
        response.status(200).send();
    });

}

module.exports = {

    getUsers: getUsers,
    getUserById: getUserById,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUserById: deleteUserById

}
