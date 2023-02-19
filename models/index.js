const User = require("./user");
const Post = require("./post");

Post.belongsTo(User,{
    as: "User",
    onDelete:"CASCADE",
})
User.hasMany(Post, {
    as: "Post",
})

module.exports = {
    User,
    Post
}