//import express from "express";
const express = require('express');

// import { listProducts} from "../controllers/products.js";
//import { listUsers, findUser} from "../controllers/users.js";

const productsController = require("../controllers/products.cjs");
const usersController = require("../controllers/users.cjs");


const router = express.Router();

/*

three controllers
/products
/users
/admin

*/ 


router.get('/', (req, res) => {
    res.send("I am gROXXOT")
});



//router.get('/products', verifyToken, getUsers);
router.get('/products', productsController.listProducts);
router.get('/users', usersController.listUsers);
router.post('/login/find_user', usersController.findUser)




module.exports = router
//export default router;


