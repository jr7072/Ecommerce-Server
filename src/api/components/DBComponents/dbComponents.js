const checkIfConstraintErr = err => {
    
    //create array of the constraint errors
    const constraintErr = [
                            23000,
                            23001,
                            23502,
                            23503,
                            23505,
                            23514
                         ];

    return constraintErr.includes(err);
}

//to decrease redundancy we will write a scalable error handling function
const errorFunction = (response, err) => {
    
    //create the error message instance
    const errorMessage = {
        text: 'Server Error'
    };

    //assume the db error is initially at fault of server
    //init status
    let status = 500;
    //convert error code to integer for comparison
    const code = parseInt(err.code);

    //check if the error is user error through contraint codes
    if(checkIfConstraintErr(code)){
        
        //set the errorMessage to client error
        errorMessage.text = 'Client Error';
        status = 400;
    }
    
    //set error details
    errorMessage.code = err.code;
    errorMessage.detail = err.detail;
    
    //send the errorMessage
    response.status(status).json(errorMessage);
}

module.exports = {

    errorFunction: errorFunction 
}
