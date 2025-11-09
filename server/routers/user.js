import express from 'express'
import userModel from '../model/user-model.js'
import multer from 'multer';
import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js';
import { isLoggedIn } from '../controllers/authControllers.js'

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

// update the user data
router.put('/edit', isLoggedIn, upload.single('profilepic'), async (req, res) => {
    const { name, phone, DOB, add, email } = req.body

    try {
        let user;
        if (req.file) {
            user = await userModel.findOne({ email });
            if (user.profilepic.secure_url !== 'https://res.cloudinary.com/dizherqha/image/upload/v1762653328/default_zzh0pl.jpg') {
                await cloudinary.uploader.destroy(user.profilepic.public_id);
            }

            const result = await uploadBufferToCloudinary(req.file.buffer, { folder: 'My-Projects/Mini-social' });

            user = await userModel.findOneAndUpdate({ email }, { name, phone, DOB, add, profilepic: { secure_url: result.secure_url, public_id: result.public_id }, }, { new: true });
        } else {
            user = await userModel.findOneAndUpdate({ email }, { name, phone, DOB, add }, { new: true });
        }
        
        res.status(200).json({ success: true, error: false, data: user, message: "Data updated successfully." })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
})

// delete the profilepic
router.delete('/profilepic/delete', isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email })

    try {
        await cloudinary.uploader.destroy(user.profilepic.public_id);
        user.profilepic.secure_url = 'https://res.cloudinary.com/dizherqha/image/upload/v1762653328/default_zzh0pl.jpg';
        user.profilepic.public_id = '';
        await user.save()
        res.status(200).json({ success: true, error: false, data: user, message: "Data updated successfully." })
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({ success: false, error: true, message: error.message })
    }
});

export default router