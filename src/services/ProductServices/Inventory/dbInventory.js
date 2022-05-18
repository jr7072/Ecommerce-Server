const dbConfig = require('../../../config/db_config.js');
const {
    
    errorFunction

} = require('../../../api/components/DBComponents/dbComponents.js');


const getInventory = (request, response) => {
    
    //create query string
    const queryString = `SELECT
                             id,
                             quantity
                         FROM products.product_inventory;`;
    
    //prepare string
    const item = dbConfig.prep(queryString);
    
    //run the query
    dbConfig.dbPool.query(item({}), (err, results) => {
        
        if(err){
            
            //error function from components
            errorFunction(response, err);
            return;
        }

        //send the data
        response.status(200).json(results.rows);
    });
}

const getInventoryById = (request, response) => {
    
    //get the inventory ID
    const inventoryID = request.params.id;

    //create query string
    const queryString = `SELECT 
                             id,
                             quantity
                         FROM products.product_inventory
                         WHERE id = ${"${inventoryID}"};`;

    //prep the string
    const item = dbConfig.prep(queryString);

    //create item instance
    const itemInstance = item(
                                {
                                    inventoryID: inventoryID
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

const createInventory = (request, response) => {
    
    //get data from the request
    const {
        
        quantity

    } = request.body;
    

    //create query string
    const queryString = `INSERT INTO products.product_inventory
                         (
                            quantity,
                            created_at
                         )
                         VALUES
                         (
                            ${"${quantity}"},
                            now()
                         )
                         RETURNING
                             id,
                             quantity;`;

    //prep the string
    const item = dbConfig.prep(queryString);

    //create the item instance
    const itemInstance = item(
                                 {
                                      quantity: quantity
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

const updateInventoryById = (request, response) => {
    
    //get the inventory id from the request
    const inventoryID = request.params.id;

    //get the data from request body
    const {
        
        quantity

    } = request.body;


    //create query string
    const queryString = `UPDATE products.product_inventory\
                         SET 
                             quantity = ${"${quantity}"}
                         WHERE id = ${"${inventoryID}"}
                         RETURNING
                             id,
                             quantity;`;

    //prep the string
    const item = dbConfig.prep(queryString);

    //create item instance
    const itemInstance = item(
                                 {
                                     quantity: quantity,
                                     inventoryID: inventoryID
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

const deleteInventoryById = (request, response) => {

    //get the inventory id from request
    const inventoryID = request.params.id;

    //create the query string
    const queryString = `DELETE FROM products.product_inventory
                         WHERE id = ${"${inventoryID}"};`;

    //prep the string
    const item = dbConfig.prep(queryString);

    //create the item instance
    const itemInstance = item(
                                 {
                                     inventoryID: inventoryID
                                 }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
            
            //error function from components
            errorFunction(response, err);
            return;
        }

        //send success code
        response.status(204).send();
    });
}

module.exports = {
    
    getInventory: getInventory,
    getInventoryById: getInventoryById,
    createInventory: createInventory,
    updateInventoryById: updateInventoryById,
    deleteInventoryById: deleteInventoryById

}
