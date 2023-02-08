// requirments for file
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

// creating user model
class User extends Model {}

User.init({
    email: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true,
         validate:{
            isEmail:true
         }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]
        }
    }
},{
    sequelize,
    // encrypting password
    hooks:{
        beforeCreate:userObj=>{
            userObj.password = bcrypt.hashSync(userObj.password,4);
            return userObj;
        }
    }
});

module.exports=User