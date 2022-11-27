
const {mockProducts} = require('../tests/products.cjs')
// no sequelize hjere yet
// const db = require('../models/index.cjs')
// const Op = db.Sequelize.Op;

// create temorary catalog
let catalog = mockProducts



const listProducts = (req, res) => {
    res.send(catalog)
};

// if (data == null){
//     return res.json({error: 'id not found'});

module.exports = {listProducts}