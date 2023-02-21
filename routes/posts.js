const express = require("express")
const router = express.Router()

const Post = require('../models/Post')

router.get('/add',(req,res)=>{
    res.render('posts/add')
})
router.post('/',async(req,res)=>{
    const {title,text} = req.body

    let errors = []
    if(!title) errors.push({msg:'title required'})
    if(!text) errors.push({msg:'text required'})

    if(errors.length>0) res.render('posts/add',{title,text})
    else{
        const newPost = new Post({title,text})
        await newPost.save()
        res.redirect("/posts")
    }
})
router.get('/edit/:id',async(req,res)=>{
     const post = await Post.findOne({_id:req.params.id}).lean()
     res.render("posts/edit",{post})
})
router.put('/:id',async(req,res)=>{
    const {title,text} = req.body
    await Post.findByIdAndUpdate(req.params.id,{title,text})
    res.redirect("/posts")
})
router.delete('/:id',async(req,res)=>{
    await Post.findByIdAndRemove(req.params.id) 
    res.redirect('/posts')
})
router.get('/',async (req,res)=>{
    const posts = await Post.find().lean().sort({date:-1})
    res.render('posts/index',{posts})
})

module.exports = router