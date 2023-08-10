
const Sequelize = require("sequelize")
const {models} = require("../models/index.js")
const User = models.User
const Op = Sequelize.Op

import createNewUser from "../domain/user.service"

const registerNew = async (req, res) => {

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


const listUsers = async (req, res) => {
	const name = req.query.name
	const condition = name ? { name: { [Op.like]: `%${name}%` } } : null

	User.findAll({ where: condition })
		.then(data => {
			res.status(200).send({
				"data":data,
				"errors": null
			})
		})
		.catch(err => {
			res.status(500).send({
				message:
            err.message || "Some error occurred while retrieving users."
			})
		})
}


const findUser = async (req, res) => {
	const target_email = req.body.email

	User.findByEmail(target_email)
		.then(data => {
			if (data) {
				res.status(200).send({
					"data":data,
					"errors": null     
				})
			} else {
				// console.log(`Did not find user ${target_email}`)
				res.status(404).send({
					"data": null,
					"errors": `Did not find user with  ${target_email}`, 
					"message": `ERROR: Did not find user with ${target_email}`
				})
			}

		})
		.catch(err => {
			res.status(500).send({
				message:
            err.message || "Some error occurred while finding User by email"
			})
		})

}

export default {listUsers, findUser, registerNew}