// import * as express from 'express'
// import * as cors from 'cors'
// import * as bodyParser from 'body-parser'
// SyntaxError: Cannot use import statement outside a module



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//import dotenv from "dotenv";
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('../routes/routes_main.cjs');
//dotenv.config()
const port = 3001
const app = express();


app.use(cors());
// appends requerst to req.body
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.json());
app.use(bodyParser.json())
app.use(router)

app.listen(port, () => console.log(`TS-Cart API listening on port ${port}!`))

