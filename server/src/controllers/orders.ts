const Sequelize = require("sequelize")
const {models} = require("../models/index.js")

const Order = models.Order
const OrderItem = models.OrderItem
const Op = Sequelize.Op
// import {cloneDeep} from 'lodash'

import {OrderItem } from "../domain/product.interface"

import { v4 as uuidv4 } from "uuid"


const reduceOrderTotals = (basket_items: OrderItem[]) => {
	return basket_items.reduce((tots:any, item) => {
		tots.price = tots.price+item.cost
		tots.tax = tots.tax+item.tax
		return tots
	}, {price:0, tax:0})

}

const paginateData = (data: any, pageIndex: number, rowsPerPage: number) => {
	const totalRows = data.length
	if (totalRows <= rowsPerPage) return data

	const firstRow = rowsPerPage * (pageIndex-1)
	const lastPageRow = totalRows - Math.max(totalRows % rowsPerPage, 1)

	if (firstRow > totalRows-1) {
		return data.slice(lastPageRow)
	} else {
		return data.slice(firstRow, firstRow+rowsPerPage)
	}

} 

const createNew = async (req, res) => { 
	const orderItems = req.body.order_items
	const newOrderUUID = uuidv4()
	const totals =  reduceOrderTotals(orderItems)

	const new_order = {
		order_uuid: newOrderUUID,
		user_uuid: req.body.user_uuid,
		date_placed: new Date(),
		delivery_us_state: req.body.delivery_us_state,
		items_total: totals.price,
		tax_total: totals.tax,
		shipping_total: 0.0,
		order_status: "accepted"
	}
    
	console.log(`\n\nserver - New Order OBJECT is: ${JSON.stringify(new_order)}\n\n`)


	Order.createNew(new_order)
		.then(data => {
			if (data) {
				orderItems.forEach (oi => {
					const new_order_item = {
						order_item_uuid: uuidv4(),
						product_id: oi.product_id,
						order_uuid: newOrderUUID,
						num_units: oi.num_units,
						cost: oi.cost,
						tax: oi.tax,
						order_item_status: "accepted"
					}
					console.log(`CONT----Creating Order item: ${JSON.stringify(new_order_item)}\n`)

					OrderItem.createNew(new_order_item)
				})
           

        
				console.log(`\n\nSUCCESS BE: New ORDER created with: ${JSON.stringify(data)}`)
				return res.send(data)
			} else {
				console.log(`\n\nFAIL BE: Did not create new ORDER for  ${new_order.user_uuid}`)
				return res.status(400).send({
					message: `Error (400): Did not create new product fore   ${new_order.user_uuid}`
				})
			}

		})
		.catch(err => {
			res.status(500).send({
				message:
            err.message || "Some error occurred while creating new order"
			})
		})

}


const listOrders = async (req, res) => {
	const order_uuid = req.query.uuid
	const rowsPerPage = parseInt(req.query.rows_page) > 0 ? parseInt(req.query.rows_page) : 5
	const pageIndex = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1
	const condition = order_uuid ? { order_uuid: { [Op.eq]: `%${order_uuid}%` } } : null

	Order.findAll({ 
		include: [{
			model: models.User,
			attributes: ["user_uuid", "name", "avatar_url"],
			as: "customer"
		},
		{
			model: models.OrderItem,
			as: "order_items",
			required: true, 
			attributes: ["order_item_uuid", "product_id", "num_units", "order_item_status", "cost", "tax"],
			include: [{
				model: models.Product,
				attributes: ["name", "price", "description", "image_url"],
				as: "order_item_product"
			}]
		}
		],
		where: condition }) 
		.then(data => { 
			return data.map((row, indx) => {
				row = row.toJSON() //returns a plain object
				row.index = indx+1
				return row //dont need to convert back
			})
		}) 
		.then(data => { 
			res.status(200).send({
				//res.json({
				"data":  paginateData(data, pageIndex, rowsPerPage),
				"rows": data.length,
				"pageIndex": pageIndex,
				"rowsPerPage": rowsPerPage,
				"errors": null
			})
		})
		.catch(err => {
			res.status(500).send({
				message:
            err.message || "Some error occurred while retrieving orders."
			})
		})
}


// if (data == null){
//     return res.json({error: 'id not found'});

export default {listOrders, createNew}