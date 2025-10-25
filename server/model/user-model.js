import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    profilepic: {
        type: String,
        default: 'default.jpg'
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }]
})

export default mongoose.model('user', userSchema)