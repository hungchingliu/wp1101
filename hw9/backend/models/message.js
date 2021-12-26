import mongoose from 'mongoose'
const Schema = mongoose.Schema
const MessageSchema = new Schema({
    sender: {type: mongoose.Types.ObjectId, ref: 'user'},
    body: {
        type: String,
        required: [true, 'Body field is required.']
    }
})
const Message = mongoose.model('message', MessageSchema)
export default Message