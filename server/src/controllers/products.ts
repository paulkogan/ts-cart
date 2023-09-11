const Sequelize = require("sequelize")
const {models} = require("../models/index.js")
const Product = models.Product
const Op = Sequelize.Op
import createNewProduct from "../domain/product.service"
// No types on the controller

import {
	NewProductPayload
 } from "../domain/product.interface"

import {
	TypedRequestBody, 
	TypedRequestQuery,
} from "../types/types"



const createNew = async (req:TypedRequestBody<NewProductPayload>, res) => {
	if (!req.body.price || parseFloat(req.body.price) < 0.00) {
		// console.log(`\n\nFAIL BE: Error (400): price must be >= 0 but is ${req.body.price}`)
		return res.status(400).send({
			message: `Error (400): price must be >= 0 but is ${req.body.price}`
		})
     
	}
    
	//check for duplicate product name
	const dup_product =  await Product.findAll({ where: { 
		name: { [Op.like]: `%${req.body.name}%` } 
	}  })

	if (dup_product.length > 0) {
		return res.status(400).send({
			"data": dup_product,
			"errors": "Duplicate Product",
			"message": `Error (400): Duplicate product  ${req.body.name}`

		})
	}     

	const createProductResponse = await createNewProduct(req.body) 
	// console.log(`\n\nCREATE PRODUCT RESPONSE IS  ${JSON.stringify(createProductResponse)}`)
	if (createProductResponse.status) {
		res.status(createProductResponse.status).send(createProductResponse)
	} else {
		res.status(500).send({
			message:createProductResponse.message
		})
	}

}

const listProducts = async (req: TypedRequestQuery<{name:string}>,  res) => {
	const name = req.query.name
	const condition = name ? { name: { [Op.like]: `%${name}%` } } : null

	Product.findAll({ 
		where: condition,
		order: [
			["price", "DESC"],
		],
	})
		.then(data => {
			//console.log("products "+JSON.stringify(data))
			res.status(200).send({
				"data":data,
				"errors": null
			})
		})
		.catch(err => {
			res.status(500).send({
				message:
            err.message || "Some error occurred while retrieving products."
			})
		})
}




export default {listProducts, createNew}