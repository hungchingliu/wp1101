import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import "dotenv-defaults/config.js"
import initDB from "./initDB.js"
async function connect() {
    dotenv.config()
    mongoose.connect(process.env.MONGO_URL)
    const db = mongoose.connection
    db.once('open', async() => {
        /*
        uncomment the following code to add fake users expired in 5 days
        you can set the expired time at initDB.js line:353
        */
        //await initDB() 
        console.log('MongoDB connected!')
        
    })
}

export default { connect }