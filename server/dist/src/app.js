"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_main_js_1 = __importDefault(require("./routes/routes_main.js"));
// Could not find a declaration file for module '../routes/routes_main.js
//dotenv.config()
const port = 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// appends requerst to req.body
app.use(body_parser_1.default.urlencoded({ extended: false }));
//app.use(express.json()); //thru body parser?
app.use(body_parser_1.default.json());
app.use(routes_main_js_1.default);
app.listen(port, () => console.log(`TS-Cart API listening on port ${port}!`));
//# sourceMappingURL=app.js.map