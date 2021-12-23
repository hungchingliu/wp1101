import mongoose from 'mongoose'
const Schema = mongoose.Schema
const chatRoomSchema = new Schema({
    users: {
        type: String,
        required: [true, 'chatroom name is required']
    },
    messages: {
        name: {
            type: String,
            required: [true, 'Message author is required.']
        },
        body: {
            type: String,
            required: [true, 'Body field is required.']
        }
    }
})

const chatroom = mongoose.model('chatRoom', chatRoomSchema)
export default chatRoom