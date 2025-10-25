import express from 'express'
import userModel from '../model/user-model.js'
import postModel from '../model/post-model.js'
import { isLoggedIn } from '../controllers/authControllers.js'

const router = express.Router()

// Return all posts data
router.get('/', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email })
        const posts = await postModel.find().populate('user')

        res.status(200).json({ success: true, error: false, data: { user, posts } })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

// return the post(to update) and posts
router.get('/:slug', isLoggedIn, async (req, res) => {
    const slug = req.params.slug

    try {
        const user = await userModel.findOne({ email: req.user.email })
        const posts = await postModel.find().populate('user')

        let postToUpdate = {}
        if (slug) {
            postToUpdate = await postModel.findOne({ _id: slug })
        }
        res.status(200).json({ success: true, error: false, data: { postToUpdate, user, posts } })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

// create a post
router.post('/', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email })
        const { content } = req.body

        let post = await postModel.create({ user: user._id, content })
        user.posts.push(post._id)
        await user.save()
        res.status(200).json({ success: true, error: false, data: post })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

// update the created post
router.put('/:slug', isLoggedIn, async (req, res) => {
    const slug = req.params.slug
    const content = req.body.content

    try {
        const post = await postModel.findOneAndUpdate({ _id: slug }, { content })
        res.status(200).json({ success: true, error: false, message: "Post updated successfully" })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

// like a post
router.get('/like/:slug', isLoggedIn, async (req, res) => {
    const post = await postModel.findOne({ _id: req.params.slug }).populate("user")

    if (post.likes.indexOf(req.user.userid) == -1) {
        post.likes.push(req.user.userid)
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1)
    }

    await post.save()
    res.status(200).json({ success: true, error: false, message: "Post updated successfully" })
})

export default router