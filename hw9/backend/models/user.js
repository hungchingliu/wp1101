import mongoose from 'mongoose'
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: { type: String, required: true},
})
const User = mongoose.model('user', UserSchema)
export default User