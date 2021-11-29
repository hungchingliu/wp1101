import mongoose from 'mongoose'
 
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: String,
    score: Number,
    subject: String
})
const User = mongoose.model('User', UserSchema)

export default User