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