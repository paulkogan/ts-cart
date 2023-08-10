"use strict"

//** @type {import('sequelize-cli').Migration} */

module.exports = {
	up: async(queryInterface, Sequelize) => {
		await queryInterface.createTable("users",

			{
				user_uuid: {
					allowNull: false,
					autoIncrement: false,
					primaryKey: true,
					type: Sequelize.UUID,
					unique: true,
				},
				name: {
					allowNull: true,
					type: Sequelize.STRING,
				},
				password: {
					allowNull: false,
					type: Sequelize.STRING,
				},
				email: {
					allowNull: false,
					type: Sequelize.STRING,
					unique: true,
				}, 
				avatar_url:{
					allowNull: true,
					type: Sequelize.STRING,
				}, 
				home_state:{
					allowNull: false,
					type: Sequelize.STRING,
				}

			})
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable("users")
	}
}