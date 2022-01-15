import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import "dotenv-defaults/config.js"

async function connect() {
    dotenv.config()
    mongoose.connect(process.env.MONGO_URL)
    const db = mongoose.connection
    db.once('open', () => {
        console.log('MongoDB connected!')
    })
}

export default { connect }