const User = require("./User");
const Post = require("./Post");

Post.belongsTo(User,{
    onDelete:"CASCADE"
})
User.hasMany(Post)

module.exports = {
    User,
    Post
}