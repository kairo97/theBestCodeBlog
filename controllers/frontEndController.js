const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Post, User} = require('../models')

router.get('/', (req,res)=>{
    Post.findAll({
        include:[
            {
                model:User,
                as:'User'
            }
        ]
    }).then(postData=>{
        console.log(postData)
        const hbsPost = postData.map(post=>post.toJSON())
        res.render('home',{
            isLoggedIn:req.session.isLoggedIn,
            userId:req.session.userId,
            allPosts:hbsPost
        })
    })
})
router.get("/login",(req,res)=>{
    res.render("login")
})
router.get('/signup', (req,res)=>{
    res.render('signup')
})
router.get("/profile",(req,res)=>{
    if(!req.session.userId){
        return res.redirect("/login")
    }
    User.findByPk(req.session.userId,{
        include:[
            {
                model:Post,
                as:'User'
            }
        ]
    }).then(userdata=>{
        console.log(userdata)
        const hbsData = userdata.toJSON();
        console.log('==============================')
        console.log(hbsData)
        res.render("profile",hbsData)
    })
    // res.redirect("/sessions")
})
module.exports = router