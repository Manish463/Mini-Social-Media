import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MONGODB connected: ${process.env.MONGODB_URI}`);
    } catch (err) {
        console.log(`Error occured: ${err}`);
    }
}