import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    phone: Number,
    DOB: String,
    add: String,
    password: String,
    profilepic: {
        secure_url: {
            type: String,
            default: 'https://res.cloudinary.com/dizherqha/image/upload/v1762653328/default_zzh0pl.jpg'
        },
        public_id: {
            type: String,
            default: ''
        }
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }]
})

export default mongoose.model('user', userSchema)