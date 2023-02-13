const Sequelize = require("sequelize");
const {models, sequelize} = require("../models/index.js");
import {OrderItem} from "../types/types"
const Order = models.Order;
const User = models.User;
const Op = Sequelize.Op;

import { v4 as uuidv4 } from 'uuid';


const reduceTotals = (basket_items: OrderItem[]) => {
    return basket_items.reduce((tots:any, item) => {
        const totPriceFloat = parseFloat((Number(item.price)*item.num_units).toFixed(2))
        const totTaxFloat = parseFloat((Number(item.tax)*item.num_units).toFixed(2))

        tots.price = tots.price+totPriceFloat;
        tots.tax = tots.tax+totTaxFloat;
        return tots
      }, {price:0.0, tax:0.0});

}

const createNew = async (req, res) => {
    const payload = JSON.stringify(req.body)
    console.log(`\n\nBE orders req.body ${payload}`)
    // res.status(200).send({
    //     message: `Create Product Body is ${payload}`
    // });
    // return

    // if (!req.body.price || parseFloat(req.body.price) < 0.00) {
    //     console.log(`\n\nFAIL BE: Error (400): price must be >= 0 but is ${req.body.price}`)
    //     return res.status(400).send({
    //         message: `Error (400): price must be >= 0 but is ${req.body.price}`
    //       });
     
    // }
    
    // //check for duplicate order
    // const dup_product =  await Order.findAll({ where: { 
    //     name: { [Op.like]: `%${req.body.name}%` } 
    // }  })

    // if (dup_product.length > 0) {
    //     return res.status(400).send({
    //         "data": dup_product,
    //         "errors": "Duplicate Product",
    //         "message": `Error (400): Duplicate product  ${req.body.name}`

    //     });
    // }     



    // export interface Order {
    //     order_uuid: string;
    //     user_uuid: string;
    //     date_placed: Date;
    //     delivery_us_state: string;
    //     items_total: number;
    //     tax_total: number;
    //     shipping_total: number;  
    //     order_status: string;
    //     order_items: OrderItem[]; // not part of orders model
    // }

    const totals =  reduceTotals(req.body.order_items)

    let new_order = {
        order_uuid: uuidv4(),
        user_uuid: req.body.user_uuid,
        date_placed: new Date(),
        delivery_us_state: req.body.delivery_us_state,
        items_total: totals.price,
        tax_total: totals.tax,
        shipping_total: 0.0,
        order_status: "accepted"
    }
    
    console.log(`server - New Order OBJECT is: ${JSON.stringify(new_order)}`)


    Order.createNew(new_order)
    .then(data => {
        if (data) {
            console.log(`\n\nSUCCESS BE: New ORDERR created with: ${JSON.stringify(data)}`)
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
            as: "customer"
            }],
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