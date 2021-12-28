import mongoose from "mongoose";
import { dataInit } from "./upload.js";
import dotenv from 'dotenv-defaults'
import "dotenv-defaults/config.js";

async function connect() {
  // TODO 1.1 Connect your MongoDB
  dotenv.config()
  mongoose.connect(process.env.MONGO_URL)
  const db = mongoose.connection

  db.once('open', ()=> {
    console.log('MongoDB connected!')
  })
  await dataInit()
}

export default { connect };