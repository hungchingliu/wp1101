import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        id: String,
        name: String, 
        lat: Number,
        lng: Number,
        songID: String,
        songName: String,
        imageURL: String,
        lastModifiedDate: Date
    }  
)
userSchema.index({lastModifiedDate:1}, {expireAfterSeconds: 60})
export default mongoose.model("user", userSchema)

