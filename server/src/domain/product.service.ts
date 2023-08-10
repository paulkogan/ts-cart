const {models} = require("../models/index.js")
const Product = models.Product
import { v4 as uuidv4 } from "uuid"

import {BaseProduct as BaseProductType} from "./product.interface"



const createNewProduct = async (productPayload: BaseProductType) => {
	const new_product = {...productPayload, product_id: uuidv4()}
	// console.log(`SERVICE - New Product OBJECT is: ${JSON.stringify(new_product)}`)
    
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







