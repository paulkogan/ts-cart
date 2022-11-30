// import * as express from 'express'
// import * as cors from 'cors'
// import * as bodyParser from 'body-parser'
// SyntaxError: Cannot use import statement outside a module



// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
//const dotenv = require('dotenv');



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

