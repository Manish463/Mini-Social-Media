import express from 'express'
import userModel from '../model/user-model.js'
import { isLoggedIn } from '../controllers/authControllers.js'
import upload from '../config/multer-config.js'
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from 'path';
import fs from 'fs/promises'

// Initializing importent variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router()

// return the user data
router.get('/', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({username: req.currUser})
        res.status(200).json({ success: true, error: false, data: user })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

// return the user data to edit page
router.get('/edit', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({username: req.currUser})
        res.status(200).json({ success: true, error: false, data: user })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

// update the user data
router.put('/edit', isLoggedIn, upload.single("image"), async (req, res) => {
    const {name, email} = req.body
    
    try {
        let user = await userModel.findOne({ email })
    
        if(user.profilepic != 'default.jpg') {
            const filePath = path.join(__dirname, "public", "image", "uploads", user.profilepic);

            await fs.unlink(filePath)
        }
    
        user.profilepic = req.file.filename
        user.name = name
        await user.save()
        res.status(200).json({ success: true, error: false, message: "Data updated successfully." })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

// delete the profilepic
router.get('/profilepic/delete/:slug', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email})
    user.profilepic = "default.jpg"
    await user.save()

    const filePath = path.join(__dirname, `../public/images/profilepic/${req.params.slug}`);

    try {
        await fs.unlink(filePath)
        res.status(200).json({ success: true, error: false, message: "Profilepic deleted successfully." })
    } catch(err) {
        console.log("Error:", err)
        res.status(500).json({ success: false, error: true, message: err.message })
    }
});

export default router