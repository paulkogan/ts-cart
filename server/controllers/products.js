
import {mockProducts} from '../tests/products.js';
// no sequelize hjere yet
// const db from '../models/index.cjs')
// const Op = db.Sequelize.Op;

// create temorary catalog
let catalog = mockProducts



const listProducts = (req, res) => {
    res.send(catalog)
};

// if (data == null){
//     return res.json({error: 'id not found'});

export default listProducts