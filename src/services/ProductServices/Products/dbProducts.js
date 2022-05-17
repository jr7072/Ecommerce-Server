const dbConfig = require('../../../config/db_config.js');
const {
    
    errorFunction

} = require('../../../api/components/DBComponents/dbComponents.js');


const getProducts = (request, response) => {
    
    //create the query string
    const queryString = `SELECT
                            id,
                            name,
                            description,
                            sku,
                            inventory_id,
                            price,
                            discount_id
                         FROM products.product;`;

    //prep the statement
    const item = dbConfig.prep(queryString);

    //start the query
    dbConfig.dbPool.query(item({}), (err, results) => {
            
        if(err){
            
            //error function from components
            errorFunction(response, err);
            return;
        }
        
        //send successful response
        response.status(200).json(results.rows);
    });
}

const getProductsById = (request, response) => {
    
    //get the product Id from the request
    const productID = request.params.id;

    //create the query string
    const queryString = `SELECT
                            id,
                            name,
                            description,
                            sku,
                            inventory_id,
                            price,
                            discount_id
                         FROM products.product
                         WHERE id = ${"${productID}"};`;
    
    //prep the string
    const item = dbConfig.prep(queryString);

    //create the item instance
    const itemInstance = item (
                                {
                                    productID: productID
                                }
                              );
    
    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
            
            //error function from components
            errorFunction(response, err);
            return;
        }
        
        
        //send success code and data
        response.status(200).json(results.rows);
    });
}

const createProducts = (request, response) => {
    
    const {

        name,
        description,
        sku,
        inventoryID,
        price,
        discountID 

    } = request.body;

    //create query string
    const queryString = `INSERT INTO products.product
                         (
                            name,
                            description,
                            sku,
                            inventory_id,
                            price,
                            discount_id,
                            created_at
                         )
                         VALUES
                         (
                            ${"${name}"},
                            ${"${description}"},
                            ${"${sku}"},
                            ${"${inventoryID}"},
                            ${"${price}"},
                            ${"${discountID}"},
                            now()
                         )
                         RETURNING
                            id,
                            name,
                            description,
                            sku,
                            inventory_id,
                            price,
                            discount_id;`;

    //prep the string'
    const item = dbConfig.prep(queryString);

    //create item instance
    const itemInstance = item (
                                {
                                    name: name,
                                    description: description,
                                    sku: sku,
                                    inventoryID: inventoryID,
                                    price: price,
                                    discountID, discountID 
                                }
                              );
    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
            
            //error function from components
            errorFunction(response, err);
            return;

        }

        //send back inputed data
        response.status(201).json(results.rows);

    });

}

const updateProductsById = (request, response) => {
    
    //get product id from request
    const productID = request.params.id;

    //get data from request body
    const {
        
        name,
        description,
        sku,
        inventoryID,
        price,
        discountID

    } = request.body;

    //create the query string
    const queryString = `UPDATE products.product
                         SET
                            name = ${"${name}"},
                            description = ${"${description}"},
                            sku = ${"${sku}"},
                            inventory_id = ${"${inventoryID}"},
                            price = ${"${price}"},
                            discount_id = ${"${discountID}"}
                         WHERE
                            id = ${"${productID}"}
                         RETURNING
                            name,
                            description,
                            sku,
                            inventory_id,
                            price,
                            discount_id;`;

    //prep the string
    const item = dbConfig.prep(queryString);

    //createhe item instance
    const itemInstance = item(
                                {
                                    name: name,
                                    description: description,
                                    sku: sku,
                                    inventoryID: inventoryID,
                                    price: price,
                                    discountID: discountID,
                                    productID: productID
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
            
            //error funciton from components
            errorFunction(response, err);
            return;
        }

        response.status(201).json(results.rows);

    });

}

const deleteProductsById = (request, response) => {
    
    //get the product id from request
    const productID = request.params.id;

    //create the query string
    const queryString = `DELETE FROM products.product
                         WHERE id = ${"${productID}"};`;

    //prep the string
    const item = dbConfig.prep(queryString);

    //create item instance
    const itemInstance = item(
                                {
                                    productID: productID
                                }
                             );

    //run the query
    dbConfig.dbPool.query(itemInstance, (err, results) => {
        
        if(err){
            
            //error function from components
            errorFunction(response, err);
            return;
        }

        response.status(204).send();
    });

}

module.exports = {
    
    getProducts: getProducts,
    getProductsById: getProductsById,
    createProducts: createProducts,
    updateProductsById: updateProductsById,
    deleteProductsById: deleteProductsById

}

