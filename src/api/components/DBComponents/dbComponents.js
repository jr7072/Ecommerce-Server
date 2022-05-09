//this error message will be used in all db query file
//the message can be modified in any query call
const errorMessage = {
  
    text: "There was an error on our part"

};

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

module.exports = {

    errorMessage: errorMessage,
    checkIfConstraintErr: checkIfConstraintErr 
}
