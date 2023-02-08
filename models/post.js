// TODO: create model for posts
const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

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