// importing requirements for file
const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./user")
// creating the model for post
class Post extends Model {}
Post.init({
    title: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    post: {
        type:DataTypes.TEXT,
        allownull:false,
        validate:{
            len:[1,1000]
        }
    },
    userId: {
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: "User",
            key: "id"
        }
    }
},{
    sequelize
});

module.exports = Post