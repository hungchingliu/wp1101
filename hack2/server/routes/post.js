import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async(req, res) => {
    try{
        Post.find().sort({timestamp:-1}).exec((err, ret) => {
            if(err){
                res.status(403).json({message: "error", data: null}) 
                throw err
            }
            if(ret)
                res.status(200).json({message: "success", data: ret})
            else
                res.status(403).json({message: "error", data: null})
        })
    } catch(e){
        console.log("api allPosts error" + e)
    }
})
// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async (req, res) => {

    try{
        Post.findOne({postId: req.query.pid}).exec( (err, ret) => {
        if(err){
            res.status(403).json({message: "error", post: null}) 
            throw err
        }
        if(ret)
            res.status(200).json({message: "success", post: ret})
        else
            res.status(403).json({message: "error", post: null})
     })
    } catch(e){
        console.log("api postDetail error" + e)
    }
})
// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async (req, res) => {
    try {

        var {postId, title, content, timestamp} = req.body
        const newPost = new Post({postId, title, content, timestamp})
        await newPost.save()
        res.status(200).json({message: "success"})

    } catch (e) {
        console.log("newPost error" + e)
        res.status(403).json({message: "error", post: null}) 
    }

})
// TODO 5-(1): create the 4th API (/api/post)
router.delete('/post', async (req, res) => {
    try{
        Post.deleteOne({postId: req.query.pid}).exec( (err) => {
        if(err){
            res.status(403).json({message: "error", post: null}) 
            throw err
        }
    
        res.status(200).json({message: "success"})
       
     })
    } catch(e){
        console.log("api delete post error" + e)
    }

})
export default router