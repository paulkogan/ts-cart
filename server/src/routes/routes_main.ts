import express from "express";
import productsController from "../controllers/products.js";
import ordersController from "../controllers/orders.js";
import usersController from "../controllers/users.js";
const router = express.Router();



//router.get('/products', verifyToken, getUsers);
router.get('/orders', ordersController.listOrders);
router.post('/orders/create', ordersController.createNew);
router.get('/products', productsController.listProducts);
router.post('/products/create', productsController.createNew);
router.get('/users', usersController.listUsers);
router.post('/users/find_user', usersController.findUser)
router.post('/users/register', usersController.registerNew)

export default router;