import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    phone: {
        type: Number,
        default: '0'
    },
    DOB: {
        type: String,
        default: 'YYYY-MM-DD'
    },
    add: {
        type: String,
        default: 'NA'
    },
    password: String,
    profilepic: {
        type: String,
        default: 'default.jpg'
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }]
})

export default mongoose.model('user', userSchema)