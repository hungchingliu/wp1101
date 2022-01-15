import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import "dotenv-defaults/config.js"
import initDB from "./initDB"
async function connect() {
    dotenv.config()
    mongoose.connect(process.env.MONGO_URL)
    const db = mongoose.connection
    db.once('open', async() => {
        //await initDB()
        console.log('MongoDB connected!')
        
    })
}

export default { connect }