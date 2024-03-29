const {Model, Optional} = require("sequelize")
import {
	BaseUser, 
	User } from "../domain/user.interface"

// type Optional<T> = T | {};

interface UserAttributes {
	user_uuid? : string;
	name: string;
	password: string;
	email: string;
	avatar_url: string;
	home_state: string;
}

 // could not make <Optional> work
// interface UserCreationAttributes 
// 	extends Optional <UserAttributes> {}






const userModel = (sequelize, DataTypes) => {

	const User = sequelize.define(
		"users", //name of table
		{
			user_uuid: {
				allowNull: false,
				autoIncrement: false,
				primaryKey: true,
				type: DataTypes.UUID,
				unique: true,
			},
			name: {
				allowNull: true,
				type: DataTypes.TEXT,
			},
			password: {
				allowNull: false,
				type: DataTypes.TEXT,
			},
			email: {
				allowNull: true,
				type: DataTypes.TEXT,
				unique: true,
			}, 
			avatar_url:{
				allowNull: true,
				type: DataTypes.TEXT,
			}, 
			home_state:{
				allowNull: false,
				type: DataTypes.TEXT,
			}
		},
		{
			//tableName: "users",
			//timedstamps: false, 
			updatedAt: false,
			createdAt: false
		}
	)
	//User.removeAttribute('id');
	//User.removeAttribute('createdAt');

	User.findByEmail = async (email_target:string): Promise<BaseUser> => {

		const results = await User.findOne({
			where: {email: email_target},
		})

		if (!results) {
			console.log("No user found")
		}
      
		return results

	} 

	User.registerNew = async (new_user) => {

		return await User.create(new_user)
		//return message
	}

	//no value
	// User.associate = function(models) {
	//   //models.Order.belongsTo(User, {foreignKey: 'user_uuid'});
	//   User.hasMany(models.Order, {foreignKey: 'user_uuid'})
	// };

	//sequelize.sync({alter:true})

	// (async () => {
	//   await sequelize.sync({ alter: true });
	// })();

	return User
}

module.exports = userModel

//export default userModel;

// {
//   freezeTableName: true,
// }, 