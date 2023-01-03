
const Sequelize = require("sequelize");
const {models, sequelize} = require("../models/index.js");
const Product = models.Product;
const Op = Sequelize.Op;


const listProducts = async (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Product.findAll({ where: condition })
    .then(data => {
        console.log("products "+JSON.stringify(data))
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

export default {listProducts}