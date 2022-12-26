"use strict";
// import {Sequelize, sequelize as db } from '../models/index.js'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import {Op} from "sequelize";
//const db = sequelize
//const User = db.users;
//const Op = Sequelize.Op;
const products_js_1 = __importDefault(require("../../tests/products.js"));
//import { Sequelize } from 'sequelize';
// no sequelize here yet
//const Op = Sequelize.Op;
// create temorary catalog
let catalog = products_js_1.default;
const listProducts = (req, res) => {
    res.status(200).json({
        data: catalog,
        errors: null,
    });
};
// if (data == null){
//     return res.json({error: 'id not found'});
exports.default = { listProducts };
//# sourceMappingURL=products.js.map