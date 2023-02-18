const User = require("./User");
const Post = require("./Post");

Post.belongsTo(User,{
    as: "User",
    onDelete:"CASCADE",
})
User.hasMany(Post, {
    as: "User",
})

module.exports = {
    User,
    Post
}