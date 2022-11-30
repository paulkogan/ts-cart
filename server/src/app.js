import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from "dotenv";
import router from '../routes/routes_main.js';


//dotenv.config()
const port = 3001
const app = express();


app.use(cors());
// appends requerst to req.body
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.json()); //thru body parser?
app.use(bodyParser.json())
app.use(router)

app.listen(port, () => console.log(`TS-Cart API listening on port ${port}!`))

