const dbConfig = require('../../../config/db_config.js');
const {
    
    errorFunction

} = require('../../../api/components/DBComponents/dbComponents.js');

//file contains methods for the discount table

const getDiscounts = (request, response) => {
    
    //create the query string
    const queryString = `SELECT 
                            id,
                            name,
                            description,
                            discount_percent,
                            active
                         FROM products.discount;`;

    //prep the string
    const item = dbConfig.prep(queryString);
    
    //run the query
    dbConfig.dbPool.query(item({}), (err, results) => {
        
        if(err){
            
            //error function from components
            errorFunction(response, err);
            return;
        }

        response.status(200).json(results.rows);

    });

}

const getDiscountsById = (request, response) => {
    
    //get the discount ID from request
    const discountID = request.params.id;

    //create the query string
    const queryString = `SELECT 
                            id,
                            name,
                            description,
                            discount_percent,
                            active
                         FROM products.discount
                         WHERE id = ${"${discountID}"};`;

    //prep the string
    const item = dbConfig.prep(queryString);

    //create the item instance
    const itemInstance = item(
                                {
                                    discountID: discountID
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
        
            //error function from components
            errorFunction(response, err);
            return;
        }
        
        //send the data
        response.status(200).json(results.rows);
    });

}

const createDiscounts = (request, response) => {
    
    //get data from the request body
    const {
        
        name,
        description,
        discountPercent,
        active 

    } = request.body;


    //create the query string
    const queryString = `INSERT INTO products.discount
                         (
                             name,
                             description,
                             discount_percent,
                             active,
                             created_at
                         )
                         VALUES
                         (
                             ${"${name}"},
                             ${"${description}"},
                             ${"${discountPercent}"},
                             ${"${active}"},
                             now()
                         )
                         RETURNING
                             id,
                             name,
                             description,
                             discount_percent,
                             active;`;

    //prep the string
    const item = dbConfig.prep(queryString);

    //create the item instance
    const itemInstance = item(
                                {
                                    name: name,
                                    description: description,
                                    discountPercent: discountPercent,
                                    active: active
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
        
            //error function from components
            errorFunction(response, err);
            return;
        }

        //send back created data
        response.status(201).json(results.rows);

    });
}

const updateDiscountsById = (request, response) => {
    
    //collect the id from
    const discountID = request.params.id;

    //get data from the body
    const {

        name,
        description,
        discountPercent,
        active

    } = request.body;

    //create query string
    const queryString = `UPDATE products.discount
                         SET
                             name = ${"${name}"},
                             description = ${"${description}"},
                             discount_percent = ${"${discountPercent}"},
                             active = ${"${active}"}
                         WHERE id = ${"${discountID}"}
                         RETURNING
                             id,
                             name,
                             description,
                             discount_percent,
                             active;`;
    //prep the string
    const item = dbConfig.prep(queryString);

    //create item instance
    const itemInstance = item(
                                 {
                                     name: name,
                                     description: description,
                                     discountPercent: discountPercent,
                                     active: active,
                                     discountID: discountID
                                 }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
            
            //error function from components
            errorFunction(response, err);
            return;

        }

        //send back updated data
        response.status(201).json(results.rows);
    });
}

module.exports = {
    
    getDiscounts: getDiscounts,
    getDiscountsById: getDiscountsById,
    createDiscounts: createDiscounts,
    updateDiscountsById: updateDiscountsById

}
