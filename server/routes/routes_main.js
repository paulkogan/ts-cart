import express from "express";
import productsController from "../controllers/products.js";
import usersController from "../controllers/users.js";
const router = express.Router();




router.get('/', (req, res) => {
    res.send("I am gROOT")
});



//router.get('/products', verifyToken, getUsers);
router.get('/products', productsController.listProducts);
router.get('/users', usersController.listUsers);
router.post('/users/find_user', usersController.findUser)


export default router;


