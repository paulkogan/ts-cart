import express from "express"
import productsController from "../controllers/products.js"
import ordersController from "../controllers/orders.js"
import usersController from "../controllers/users.js"
import authController from "../controllers/auth.js"
import {authorization} from "../services/be-auth-service.js"
const router = express.Router()



//router.get('/products', verifyToken, getUsers); # we started by sending token in the headers
router.get("/orders", authorization, ordersController.listOrders)
router.post("/orders/create", authorization, ordersController.createNew)
router.get("/products", productsController.listProducts)
router.post("/products/create", productsController.createNew)
router.get("/users", authorization, usersController.listUsers)
router.post("/users/find_user", usersController.findUser)
router.post("/users/register", usersController.registerNew)
router.post("/auth/login", authController.loginUser)
router.post("/auth/logout", authController.logoutUser)
router.get("/auth/verify", authorization, authController.verifySession)

export default router