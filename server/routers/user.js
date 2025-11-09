import express from 'express'
import userModel from '../model/user-model.js'
import multer from 'multer';
import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js';
import { isLoggedIn } from '../controllers/authControllers.js'
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from 'path';
import fs from 'fs/promises'

// Initializing importent variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

function uploadBufferToCloudinary(buffer, options = {}) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
}

// return the user data
router.get('/', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.currUser })
        res.status(200).json({ success: true, error: false, data: user })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

// return the user data to edit page
router.get('/edit', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.currUser })
        res.status(200).json({ success: true, error: false, data: user })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

// update the user data
router.put('/edit', isLoggedIn, upload.single('profilepic'), async (req, res) => {
    const { name, phone, DOB, add, email } = req.body

    try {
        if (req.file) {
            const user = await userModel.findOne({ email });
            if (user.profilepic.secure_url !== 'https://res.cloudinary.com/dizherqha/image/upload/v1762653328/default_zzh0pl.jpg') {
                await cloudinary.uploader.destroy(user.profilepic.public_id);
            }

            const result = await uploadBufferToCloudinary(req.file.buffer, { folder: 'My-Projects/Mini-social' });
            user.profilepic.secure_url = result.secure_url;
            user.profilepic.public_id = result.public_id;
            await user.save();
        }

        const user = await userModel.findOneAndUpdate({ email }, { name, phone, DOB, add });

        res.status(200).json({ success: true, error: false, message: "Data updated successfully." })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

// delete the profilepic
router.get('/profilepic/delete/:slug', isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email })

    try {
        await cloudinary.uploader.destroy(user.profilepic.public_id);
        user.profilepic.secure_url = 'https://res.cloudinary.com/dizherqha/image/upload/v1762653328/default_zzh0pl.jpg';
        user.profilepic.public_id = '';
        await user.save()
    } catch (error) {
        console.log("Error:", err)
        res.status(500).json({ success: false, error: true, message: err.message })
    }
});

export default router