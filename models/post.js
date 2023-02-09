// importing requirements for file
const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");
// creating the model for post
class Post extends Model {}
Post.init({
    post: {
        type:DataTypes.STRING,
        allownull:false,
        validate:{
            len:[1,1000]
        }
    }
},{
    sequelize
});

module.exports = Post