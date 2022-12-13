// import {Sequelize, sequelize as db } from '../models/index.js'

// import {Op} from "sequelize";
//const db = sequelize
//const User = db.users;
//const Op = Sequelize.Op;



import mockProducts from '../../tests/products.js'
//import { Sequelize } from 'sequelize';

// no sequelize here yet

//const Op = Sequelize.Op;

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