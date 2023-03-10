// importing requirements for file
const express = require('express');
const router = express.Router();
const {User,Post} = require('../models');
const bcrypt = require("bcrypt");
// get route for all users
router.get("/",(req,res)=>{
   User.findAll().then(userData=>{
    res.json(userData)
   }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"oh noes!",err})
   })
})
// logout route
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occurred while logging out.");
      }
      res.clearCookie("sid");
      res.status(200).send("Logout successful.");
    });
  });

// find user by ID
router.get("/:id",(req,res)=>{
   User.findByPk(req.params.id,{
    include:[Post]
   }).then(userData=>{
    res.json(userData)
   }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"OH NO",err})
   })
})
// create new user
router.post("/",(req,res)=>{
    console.log(req.body);
   User.create({
    email:req.body.email,
    password:req.body.password
   }).then(userData=>{
    req.session.userId = userData.id;
    req.session.userEmail = userData.email;
    res.json(userData)
   }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"OH NO",err})
   })
})
// Login route
router.post("/login",(req,res)=>{
   User.findOne({
   where:{
    email:req.body.email
   }
   }).then(userData=>{
    if(!userData){
        return res.status(401).json({msg:"incorrect email or password"})
    } else {
        if(bcrypt.compareSync(req.body.password,userData.password)){
            req.session.userId = userData.id;
            req.session.userEmail = userData.email;
            return res.json(userData)
        } else {
            return res.status(401).json({msg:"incorrect email or password"})
        }
    }
   }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"OH NO",err})
   })
})
router.post('/signup', (req,res)=>{
    console.log(req.body);
    User.create({
        email:req.body.email,
        name:req.body.name,
        password: req.body.password,
    })
    .then((userData)=>{
        req.session.userId = userData.id;
        req.session.userEmail = userData.email;
        req.session.username = userData.name;
        res.json(userData);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({msg:'oops, sorry', err});
    });
})



module.exports = router;