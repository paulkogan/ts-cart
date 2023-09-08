
const {models} = require("../models/index.js")
const User = models.User
import { v4 as uuidv4 } from "uuid"

import {
	CreateUser 
} from "../domain/user.interface"

const createNewUser = async (userPayload: CreateUser) => {
	const new_user = {...userPayload, user_uuid: uuidv4()}
	// console.log(`SERVICE - New  USER is: ${JSON.stringify(new_user}`)
    
	try {
		const createUserResponse = await User.registerNew(new_user)

		const responseObject = {
			status: 201,
			message: `Success - New User ${userPayload.name} Created `,
			data: createUserResponse
		}
		return responseObject  

	} catch (error:any) {
		const responseObject = {
			status: 400,
			message: error.message,
			data: null
		}
		return responseObject  

	}

}

export default createNewUser







