const userModel = (sequelize, DataTypes) => {
    let User = sequelize.define(
      'users', //name of table
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
        }
      },
      {
        //tableName: "users",
        //timedstamps: false, 
        updatedAt: false,
        createdAt: false
      }
    );
    //User.removeAttribute('id');
    //User.removeAttribute('createdAt');

    User.findByEmail = async (email_target) => {

      let results = await User.findOne({
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


    //sequelize.sync({alter:true})
    return User;
  };

module.exports = userModel

//export default userModel;

  // {
  //   freezeTableName: true,
  // }, 