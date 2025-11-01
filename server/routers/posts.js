import express from 'express'
import userModel from '../model/user-model.js'
import postModel from '../model/post-model.js'
import { isLoggedIn } from '../controllers/authControllers.js'

const router = express.Router()

// Return all posts data
router.get('/', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email }).populate('posts')
        const posts = await postModel.find().populate('user')

        res.status(200).json({ success: true, error: false, data: { user, posts } })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

// create a post
router.post('/create', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email })
        const { content } = req.body

        let post = await postModel.create({ user: user._id, content })
        user.posts.push(post._id)
        await user.save()
        res.status(200).json({ success: true, error: false, data: post, message: "Post created successfully!" })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

// like a post
router.get('/like/:slug', isLoggedIn, async (req, res) => {
    try {
        const post = await postModel.findOne({ _id: req.params.slug }).populate("user")
    
        if (post.likes.indexOf(req.user.userid) == -1) {
            post.likes.push(req.user.userid)
        } else {
            post.likes.splice(post.likes.indexOf(req.user.userid), 1)
        }
    
        await post.save()
        res.status(200).json({ success: true, error: false, message: "Post liked successfully!" })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

// delete a post
router.get('/delete/:slug', isLoggedIn, async (req, res) => {
    const postid = req.params.slug;
    try {
        const posts = await postModel.findOneAndDelete({_id: postid})
        res.status(200).json({ success: true, error: false, message: "Post deleted successfully!" })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

export default router