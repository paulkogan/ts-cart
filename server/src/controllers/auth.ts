
//const Sequelize = require("sequelize");
const {models, sequelize} = require("../models/index.js")
const User = models.User

//import { v4 as uuidv4 } from 'uuid';
import {generateToken} from "../services/be-auth-service"
import {Response} from 'express'
import {
	LoginData, 
	LogoutRequestBody, 
	LogoutUserData, 
	TypedRequestBody
} from '../types/types'

import {
	TokenUser, 
	User } from "../domain/user.interface"

const verifySession = async (req, res) => {
	return res.json({ 
		session: req.session
	})

}

const logoutUser = async (req:LogoutRequestBody, res:Response) => {
	//console.log(`LOGOUT BODY ======= ${JSON.stringify(req.body)}`)
	const logoutUser = JSON.parse(req.body.user) as LogoutUserData  // body.user is just string, not an object
	if (!logoutUser || !logoutUser.email) {
		return res.status(404).json({
			data: null,
			errors: "Missing Logout User", 
			message: "Missing Logout User",
		})
	}


	res.cookie("tsToken", "none", { 
		httpOnly: true,
		expires: new Date(Date.now() + 3 * 1000)

	})

	return res.status(200).json({
		data: null,
		errors: null, 
		message: `Logout Successful for ${logoutUser.email}`
	})

}

const loginUser = async (req: TypedRequestBody<LoginData>, res) => {
	const tryEmail = req.body.userid
	const tryPassword = req.body.password


	if (!tryEmail || !tryPassword) {
		return res.status(404).json({
			data: null,
			errors: "Missing Logon credentials", 
			message: "Missing Logon credentials"
		})
	}
    
	const matchUser = await User.findByEmail(tryEmail)

	if (matchUser && (tryPassword == matchUser.password)) {
		const returnUser = {
			name: matchUser.name,
			email: matchUser.email,
			home_state: matchUser.home_state, 
			user_uuid: matchUser.user_uuid
		} as TokenUser

		const token = generateToken(matchUser)
		const decoded_token = JSON.parse(atob(token.split(".")[1]))
		/**res.cookie('token', token, { 
         *  httpOnly: true, //can only be modified server-side
         *  secure: prod? true, // cookie only works in https
         *  SameSite: "none", // allow 3rd party sites, but requires secure https not for local use
         *  domain: __prod__ ? ".kreddit.vercel.app" : undefined,
         *  maxAge: in miliseconds
         *  expires:  in miliseconds

         **/

		const minutes5millis = 60 * 5 * 1000

		res.cookie("tsToken", token, { 
			httpOnly: true,
			maxAge: minutes5millis, 
		})

		return res.status(200).json({
			data: decoded_token,
			errors: null, 
			message: `Login Successful for ${returnUser.name}`
		})

	} else {
		return res.status(401).json({
			data: null,
			errors: `Login failed for ${tryEmail}`, 
			message: "Username or Password is Wrong"
		})
	}


	// bcrypt.compare(req.body.password, user.password, <-- check pwd         
	//     function(err, valid) {
	//       if (!valid) {
	//        return res.status(404).json({
	//                error: true,
	//                message: ‘Username or Password is Wrong’
	//          });
	//       }




}




export default {loginUser, logoutUser, verifySession}