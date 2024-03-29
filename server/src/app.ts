import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
// import jsonWebToken from 'jsonwebtoken'   
// import {expressjwt} from 'express-jwt';
import cookieParser from "cookie-parser"
import router from "./routes/routes_main.js"



const app = express()


//app.use(cors());

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
)

// check token in headers. We've now switched to cookies
// const secret = process.env.JWT_SECRET || "abcd";
// app.use(expressjwt(  {secret: secret,  algorithms: ['HS256'] }).unless({
//     path:[
//       '/auth/login',
//       '/auth/verify', 
//       '/products'  //dont check JWT for this route
//     ]}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

export {app}


