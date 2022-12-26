"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_js_1 = __importDefault(require("../controllers/products.js"));
const users_js_1 = __importDefault(require("../controllers/users.js"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send("I am gROOT");
});
//router.get('/products', verifyToken, getUsers);
router.get('/products', products_js_1.default.listProducts);
router.get('/users', users_js_1.default.listUsers);
router.post('/users/find_user', users_js_1.default.findUser);
router.post('/users/register', users_js_1.default.registerNew);
exports.default = router;
//# sourceMappingURL=routes_main.js.map