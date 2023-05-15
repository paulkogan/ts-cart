const Sequelize = require("sequelize");
const {models, sequelize} = require("../models/index.js");
import {OrderItem as OrderItemType} from "../types/types"
const Order = models.Order;
const OrderItem = models.OrderItem;
const User = models.User;
const Product = models.Product;
const Op = Sequelize.Op;

import { v4 as uuidv4 } from 'uuid';


const reduceOrderTotals = (basket_items: OrderItemType[]) => {
    return basket_items.reduce((tots:any, item) => {
        tots.price = tots.price+item.cost;
        tots.tax = tots.tax+item.tax;
        return tots
      }, {price:0, tax:0});

}

const createNew = async (req, res) => {
    const payload = JSON.stringify(req.body)   
    const orderItems = req.body.order_items
    const newOrderUUID = uuidv4()
    const totals =  reduceOrderTotals(orderItems)

    let new_order = {
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
                let new_order_item = {
                    order_item_uuid: uuidv4(),
                    item_cart_id: oi.item_cart_id,
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
            return res.send(data);
        } else {
            console.log(`\n\nFAIL BE: Did not create new ORDER for  ${new_order.user_uuid}`)
            return res.status(400).send({
                message: `Error (400): Did not create new product fore   ${new_order.user_uuid}`
              });
        }

    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating new order"
        });
    });

}


const listOrders = async (req, res) => {
    const order_uuid = req.query.uuid;
    var condition = order_uuid ? { order_uuid: { [Op.eq]: `%${order_uuid}%` } } : null;

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
        res.status(200).send({
            "data":data,
            "errors": null
        });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving orders."
        });
    });
}


// if (data == null){
//     return res.json({error: 'id not found'});

export default {listOrders, createNew}