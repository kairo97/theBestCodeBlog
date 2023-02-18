const User = require("./User");
const Post = require("./Post");

Post.belongsTo(User,{
    as: "author",
    onDelete:"CASCADE",
})
User.hasMany(Post, {
    as: "author",
})

module.exports = {
    User,
    Post
}