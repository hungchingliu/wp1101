import express from 'express'
import cors from 'cors'
import usersRoute from './routes/users'
import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'
import { deleteDB } from './mongo'
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', usersRoute)

const port = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

dotenv.config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res) => console.log("mongo db connection created"))


const db = mongoose.connection

db.on("error", (err) => console.log(err))
db.once("open", async () => {
    await deleteDB()
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))