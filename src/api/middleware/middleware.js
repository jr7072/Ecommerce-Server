//this document contains any custom made middleware

//include the errorMessage Component
const dbComponents = require('../components/DBComponents/dbComponents.js');

//this clears the errorMessage component of the datebase
//after an api call
const clearErrorComponent = (request, response, next) => {
    
    dbComponents.errorMessage = {
                                    
                                    text: "There was an error on our part"
                                };

    next();
}

module.exports = {
                    
                     clearErrorComponent: clearErrorComponent,

                 }
