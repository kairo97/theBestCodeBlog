// importing requirements for file
const express = require('express');
const router = express.Router();
const {User, Post} = require('../models');
// get all route
router.get('/', (req,res)=>{
    Post.findAll().then(postData=>{
        res.json(postData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'OH NO', err})
    })
})
// get by id route
router.get("/:id", (req,res)=>{
    Post.findByPk(req.params.id,{
        include:[User]
    }).then(postData=>{
        res.json(postData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"OH NO", err})
    })
})
// create post route
router.post('/', (req,res)=>{
    // adding security so you must be logged in to post
    if(!req.session.userId){
        return res.status(403).json({msg:"login first"})
    }
    console.log(req.body);
    Post.create({
        post:req.body.post,
        userId:req.session.userId
    }).then(postData=>{
        res.json(postData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'OH NO', err})
    })
})
// create a delete route with security to confirm that user is who created post
router.delete("/:id",(req,res)=>{
    if(!req.session.userId){
       return res.status(403).json({msg:"login first post"})
    }
    console.log(req.body);
    Post.findByPk(req.params.id).then(postData=>{
       if(!postData){
          return res.status(404).json({msg:"no such post"})
       } else if(postData.UserId!== req.session.userId){
          return res.status(403).json({msg:"not your post!"})
       }
       Post.destroy({
        where:{
           id:req.params.id,
        }
       }).then(postData=>{
         res.json(postData)
        }).catch(err=>{
         console.log(err);
         res.status(500).json({msg:"oh no!",err})
        })
    }).catch(err=>{
         console.log(err);
         res.status(500).json({msg:"oh no!",err})
    })
 })
 
 module.exports = router;