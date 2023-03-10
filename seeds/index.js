const sequelize = require('../config/connection');
const {User, Post} = require('../models')

const seed = async ()=>{
    await sequelize.sync({force:true});
    const users = await User.bulkCreate([
        {
            email:"guy@dudebro.com",
            password: "suhdude!"
        },{
            email: "theodor@fakemail.com",
            password: "IamNotAbear"
        },{
            email: "notawolf@human.com",
            password: "woofwoof"
        }
    ],{
        individualHooks:true
    })

    const posts = await Post.bulkCreate([
        {
            title: "dude",
            post:"dude, suh?",
            UserId:1
        },{
            title:"not a bear",
            post:"why does everyone think that I'm a bear?",
            UserId:2
        },{
            title:"I am a human",
            post:"hello fellow humans, what a nice day to leave your chicken coop open am I right?",
            UserId:3
        }
    ])
    process.exit(1)
}

seed();