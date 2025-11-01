// importing packages and modules
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from "url";
import { dirname } from "path";

// Initializing importent variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// importing user defined modules
import indexRouter from './routers/index.js'
import postRouter from './routers/posts.js'
import userRouter from './routers/user.js'
import './config/mongoose-connection.js'

// initializing variables
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

// mounting the routers
app.use('/', indexRouter)
app.use('/posts', postRouter)
app.use('/:username', (req, res, next) => {
    req.currUser = req.params.username
    next()
}, userRouter)

app.listen(3000, () => {
    console.log("Server is running at port 3000")
})