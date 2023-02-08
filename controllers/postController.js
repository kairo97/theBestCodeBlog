//  TODO: import in all required packages
//  TODO: create get route for getting all posts
//  TODO: create post request for creating a new user's post
//  TODO: create put request for user editing their post
//  TODO: create delete request for removing a post
//  TODO: export file out as router
const express = require('express');
const router = express.Router();
const {User, Post} = require('../models');

router.get('/', (req,res)=>{
    Post.findAll().then(postData=>{
        res.json(postData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:'OH NO', err})
    })
})
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
router.post('/', (req,res)=>{
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