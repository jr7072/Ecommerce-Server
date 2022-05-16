const dbConfig = require('../../../config/db_config.js');
//import database components
const {
          
          errorFunction

      } = require('../../../api/components/DBComponents/dbComponents.js');

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
            
            //handles db errors: look in component files
            errorFunction(response, err);
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
            
            //error handling function from components
            errorFunction(response, err);
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
                                
                                )
                         RETURNING 
                            id,
                            username,
                            first_name,
                            last_name;`;
    
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
        
        if(err){
    
            //error function from components
            errorFunction(response, err);
        }
        
        //send back the created row
        response.status(201).json(results.rows);

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
                         WHERE id = ${"${userID}"}
                         RETURNING 
                            id,
                            username,
                            first_name,
                            last_name;`;
    
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
        

        if(err){
            
            //error function from components
            errorFunction(response, err);
            
        }
        
        //send upadated object
        response.status(201).json(results.rows);

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
        
        if(err){
            
            //error function from components
            errorFunction(response, err);
        }
        
        //send success code
        response.status(204).send();
    });

}

module.exports = {

    getUsers: getUsers,
    getUserById: getUserById,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUserById: deleteUserById

}
