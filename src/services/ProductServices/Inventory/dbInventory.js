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

module.exports = {
    
    getInventory: getInventory,
    getInventoryById: getInventoryById

}
