const express = require("express");

const router =  express.Router();
const Post = require('../models/post');

router.post("", (req, res, next) => { //caminho entre "" continua o que veio de parametro no app.js
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added sucessfully",
      postId: createdPost._id
    });
  }); //mongoose vai automaticamente criar a query para inserir no banco
});

router.put("/:id",(req,res,next)=>{
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post).then(result =>{
    res.status(200).json({message: "Updated sucessfully!!"});
  })
});

//somente url /posts vai usar esse middleware
router.get('', (req, res, next) => {
  Post.find({title: 'titulo'}).then(documents => {
    res.status(200).json({
      message: 'Posts fetched succesfully!',
      posts: documents
    });
  });
});

//get de um post só
router.get("/:id",(req,res,next)=>{
  Post.findById(req.params.id).then(post=>{
    if(post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message: "post not found"});
    }
  });
})

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  })
});

module.exports = router;
