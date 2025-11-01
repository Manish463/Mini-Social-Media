import express from 'express'
import { register, login } from '../controllers/authControllers.js'

const router = express.Router()

// root
router.get('/', (req, res) => {
    res.send('Hello World!')
})

// register
router.get('/register', (req, res) => {
    res.send("Register page")
})
router.post('/register', register)

// login
router.get('/login', (req, res) => {
    res.send('login page')
})
router.post('/login', login)

export default router