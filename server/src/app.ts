import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import jsonWebToken from 'jsonwebtoken'   
import {expressjwt} from 'express-jwt';
import cookieParser from 'cookie-parser'
import 'dotenv/config'


import router from './routes/routes_main.js';


const port = 3001
const app = express();
const secret = process.env.JWT_SECRET || "abcd";

//app.use(cors());

app.use(
  cors({
      origin: "http://localhost:3000",
      credentials: true,
  })
);
app.use(expressjwt(  {secret: secret,  algorithms: ['HS256'] }).unless({
    path:[
      '/auth/login',
      '/auth/verify', 
      '/products'  //dont check JWT for this route
    ]}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(router)

app.listen(port, () => console.log(`TS-Cart API listening on port ${port} with:  ${secret}!`))

