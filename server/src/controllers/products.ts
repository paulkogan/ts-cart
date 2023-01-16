const Sequelize = require("sequelize");
const {models, sequelize} = require("../models/index.js");
const Product = models.Product;
const Op = Sequelize.Op;

import { v4 as uuidv4 } from 'uuid';


const createNew = async (req, res) => {
    const payload = JSON.stringify(req.body)
    console.log(`\n\nBE req.body ${payload}`)
    // res.status(200).send({
    //     message: `Create Product Body is ${payload}`
    // });
    // return

    if (!req.body.price || parseFloat(req.body.price) < 0.00) {
        console.log(`\n\nFAIL BE: Error (400): price must be >= 0 but is ${req.body.price}`)
        return res.status(400).send({
            message: `Error (400): price must be >= 0 but is ${req.body.price}`
          });
     
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

        });
    }     

    let new_product = {
        product_id: uuidv4(),
        name: req.body.name,
        image_url: req.body.image_url,
        price: parseFloat(req.body.price),
        inventory: req.body.inventory,
        description: req.body.description
    }
    
    console.log(`server - New Product OBJECT is: ${JSON.stringify(new_product)}`)


    Product.createNew(new_product)
    .then(data => {
        if (data) {
            console.log(`\n\nSUCCESS BE: New Product created with: ${JSON.stringify(data)}`)
            return res.send(data);
        } else {
            console.log(`\n\nFAIL BE: Did not create new product with  ${new_product.name}`)
            return res.status(400).send({
                message: `Error (400): Did not create new product with   ${new_product.name}`
              });
        }

    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating new product"
        });
    });

}


const listProducts = async (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Product.findAll({ where: condition })
    .then(data => {
        //console.log("products "+JSON.stringify(data))
        res.status(200).send({
            "data":data,
            "errors": null
        });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving products."
        });
    });
}


// if (data == null){
//     return res.json({error: 'id not found'});

export default {listProducts, createNew}