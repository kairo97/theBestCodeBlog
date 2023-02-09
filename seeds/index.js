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
            post:"dude, suh?",
            userId:1
        },{
            post:"why does everyone think that I'm a bear?",
            userId:2
        },{
            post:"hello fellow humans, what a nice day to leave your chicken coop open am I right?",
            userId:3
        }
    ])
    process.exit(1)
}

seed();