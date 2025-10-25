import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Mongoose connected')
}).catch((err) => {
    console.log('Mongoose not connected', err)
})

export default mongoose.connection;