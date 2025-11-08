import userModel from '../model/user-model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    const { name, username, password, email } = req.body

    try {
        let oldUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (oldUser) return res.status(409).json({ success: false, error: true, message: "User already exist! Try by changing username and email." });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({ name, username, password: hash, email });
        const token = jwt.sign({ email, userid: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
        res.status(201).json({ success: true, error: false, data: user, token })
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await userModel.findOne({ email })
        if (!user) return res.status(401).json({ success: false, error: true, message: "Invalid email or password" })

        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const token = jwt.sign({ email, userid: user._id }, process.env.JWT_KEY, { expiresIn: '1h' })
            res.status(200).json({ success: true, error: false, message: "Login successful", token })
        } else {
            res.status(401).json({ success: false, error: true, message: "Somthing went wrong" })
        }
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
}

export const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if(!authHeader) return res.status(401).json({ success: false, error: true, message: "You are not logged in. Please login first" });

    try {
        const data = jwt.verify(authHeader.split(" ")[1], process.env.JWT_KEY);
        req.user = data;
        next();
    } catch (error) {
        res.status(500).json({ success: false, error: true, message: error.message })
    }
}