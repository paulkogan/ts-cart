
const Sequelize = require("sequelize")
const {models} = require("../models/index.js")
const User = models.User
const Op = Sequelize.Op

import createNewUser from "../domain/user.service"

import {Response} from "express"
import {
	TypedRequestBody, 
	TypedRequestQuery,
	GetResponse
} from "../types/types"

import {
	CreateUser, 
	User 
} from "../domain/user.interface"



const registerNew = async (req: TypedRequestBody<CreateUser>, res: Response) => {

	const validEmailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+$/


	if (!req.body.email.match(validEmailRegex)) {
		res.status(400).send({
			message: `Error (400): invalid email  ${req.body.email}`
		})
		return  
	}


	const createUserResponse = await createNewUser(req.body) 
	// console.log(`\n\nCREATE User RESPONSE IS  ${JSON.stringify(createUserResponse)}`)
	if (createUserResponse.status) {
		res.status(createUserResponse.status).send(createUserResponse)
	} else {
		res.status(500).send({
			message:createUserResponse.message
		})
	}
}


const listUsers = async (req: TypedRequestQuery<{name:string}>, res: Response<GetResponse<User[]>>) => {
	const name = req.query.name
	const condition = name ? { name: { [Op.like]: `%${name}%` } } : null

	User.findAll({ 
		where: condition,
		order: [
			["name", "ASC"],
		],
	})
		.then(data => {
			res.status(200).send({
				"data":data,
				"errors": null,
				"message": null
			})
		})
		.catch(err => {
			res.status(500).send({
				"data": null,
				"errors": `Did not find users with ${name}`, 
				"message": `ERROR: for  List Users - ${err.message} `
			})
		})
}




const findUser = async (req: TypedRequestBody<{email:string}>, res: Response<GetResponse<User>>) => {
	const target_email = req.body.email
	console.log(`User target_email is ${target_email}`)

	User.findByEmail(target_email)
		.then(data => {
			if (data) {
				console.log(`Found user ${JSON.stringify(data)}`)
				res.status(200).send({
					"data":data,
					"errors": null     
				})
			} else {
				console.log(`Did not find user ${target_email}`)
				res.status(404).send({
					"data": null,
					"errors": `Did not find user with  ${target_email}`, 
					"message": `ERROR: Did not find user with ${target_email}`
				})
			}

		})
		.catch(err => {
			res.status(500).send({
				"data": null,
				"errors": `Did not find user with  ${target_email}`, 
				"message": `ERROR: for  ${target_email} - ${err.message} `
			})
		})

}

export default {listUsers, findUser, registerNew}