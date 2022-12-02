
import mockProducts from '../tests/products.js'

// no sequelize here yet



import sequelize from '../models/index.js'
const db = sequelize
//const Op = db.Sequelize.Op;

// create temorary catalog
let catalog = mockProducts



const listProducts = (req, res) => {
    res.status(200).json({
        data: catalog,
        errors: null,
        });



};

// if (data == null){
//     return res.json({error: 'id not found'});

export default {listProducts}