const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {Post, User} = require('../models')

router.get('/', (req,res)=>{
    Post.findAll({
        include:[
            {
                model:User,
                as:'author'
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
router.get("/profile", (req, res) => {
    if (!req.session.userId) {
      return res.redirect("/login");
    }
  
    User.findByPk(req.session.userId, {
      include: [
        {
          model: Post,
          as: "author",
        },
      ],
    })
      .then((userData) => {
        console.log(userData);
        const hbsData = userData.toJSON();
        console.log("==============================");
        console.log(hbsData);
        return Post.findAll({
          where: {
            userId: req.session.userId,
          },
          include: [
            {
              model: User,
              as: "author",
            },
          ],
        }).then((postData) => {
          console.log(postData);
          const hbsPost = postData.map((post) => post.toJSON());
          res.render("profile", {
            isLoggedIn: req.session.isLoggedIn,
            userId: req.session.userId,
            allPosts: hbsPost,
          });
        });
      })
      .catch((err) => {
        console.error(err);
        res.redirect("/sessions");
      });
  });
  
  
module.exports = router