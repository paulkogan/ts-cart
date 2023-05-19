const Sequelize = require("sequelize");
const {models, sequelize} = require("../models/index.js");
const Product = models.Product;
const Op = Sequelize.Op;
import { v4 as uuidv4 } from 'uuid';

import {
    OrderItem as OrderItemType, 
    BaseProduct as BaseProductType, 
    Product as ProductType} from "./product.interface"



const createNewProduct = async (productPayload: BaseProductType) => {
    let new_product = {...productPayload, product_id: uuidv4()}
    console.log(`SERVICE - New Product OBJECT is: ${JSON.stringify(new_product)}`)
    
    try {
        const createProductResponse = await Product.createNew(new_product)

        const responseObject = {
                status: 201,
                message: `Success - New Product ${productPayload.name} Created `,
                data: createProductResponse
        }
        return responseObject  

    } catch (error: any) {
        const responseObject = {
            status: 400,
            message: error.message,
            data: null
        }
        return responseObject  

    }

}

export default createNewProduct







