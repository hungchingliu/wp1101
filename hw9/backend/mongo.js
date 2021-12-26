import dotenv from 'dotenv-defaults'
import mongoose from 'mongoose'
import User from './models/user'
import ChatBox from './models/chatBox'
import Message from './models/message'


dotenv.config()
mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection

db.once('open', ()=> {
    console.log('MongoDB connected!')
})
db.User = User
db.ChatBox = ChatBox
db.Message = Message

export default db