import userModel from '../model/user-model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    const { name, username, password, email } = req.body

    try {
        let oldUser = await userModel.findOne({ email })
        if (oldUser)
            return res.status(401).send({ success: false, error: true, message: "User already exist" })

        oldUser = await userModel.findOne({ username })
        if (oldUser)
            return res.status(401).send({ success: false, error: true, message: "User already exist" })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let user = await userModel.insertOne({ name, username, email, password: hash })
                let token = jwt.sign({ email, userid: user._id }, process.env.JWT_KEY)
                res.status(200).json({ success: true, error: false, data: user, token })
            })
        })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await userModel.findOne({ email })
        if (!user) return res.status(500).send({ success: false, error: true, message: "Somthing went wrong." })

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ email, userid: user._id }, process.env.JWT_KEY)
                res.status(200).json({ success: true, error: false, message: "Login successful", token })
            } else {
                res.status(500).json({ success: false, error: true, message: "Somthing went wrong" })
            }
        })
    } catch (error) {
        res.json({ success: false, error: true, message: error.message })
    }
}

export const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        res.status(401).json({ success: false, error: true, message: "You are not logged in. Please login first" })
    } else {
        let data = jwt.verify(authHeader.split(" ")[1], process.env.JWT_KEY)
        req.user = data
        next()
    }
}

export const logout = (req, res) => {
    res.cookie("token", "")
    res.status(200).json({ success: true, error: false, message: "Logout Successful" })
}