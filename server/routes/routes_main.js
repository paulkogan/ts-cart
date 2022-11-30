import express from "express";
//const express = require('express');

// import { listProducts} from "../controllers/products.js";
//import { listUsers, findUser} from "../controllers/users.js";

import productsController from "../controllers/products.js";
import usersController from "../controllers/users.js";


const router = express.Router();

/*

three controllers
/products
/users
/admin

*/ 


router.get('/', (req, res) => {
    res.send("I am gROOT")
});



//router.get('/products', verifyToken, getUsers);
router.get('/products', productsController.listProducts);
router.get('/users', usersController.listUsers);
router.post('/users/find_user', usersController.findUser)




//module.exports = router
export default router;


