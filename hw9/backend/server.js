import http from 'http'
import express from 'express'
import dotenv from 'dotenv-defaults'
import mongoose from 'mongoose'
import WebSocket from 'ws'
import ChatRoom from '../frontend/src/Containers/ChatRoom'
import User from './models/user'
import bcrypt from 'bcryptjs'
import {sendData, sendStatus, initData} from './wssConnect'
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({server})

const broadcastMessage = (data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client)
        sendStatus(status, client)
    })
}

db.once('open', ()=> {
    console.log('MongoDB connected!')
    User.deleteMany({}).exec()
    wss.on('connection', (ws) => {

        ws.onmessage = async (byteString) => {
            const { data } = byteString
            const [task, payload] = JSON.parse(data)
            switch(task){
                case 'input':{
                    const { name, body } = payload
                    const message = new Message({name, body})
                    try {
                        await message.save()
                    } catch (e){
                        throw new Error("Message DB save error: " + e)
                    }
                    
                    broadcastMessage(['output', [payload]], {
                        type: 'success',
                        msg: 'Message sent.'
                    })
                    break
                }
                case 'signIn':{
                    const {username, hash} = payload
                    const user = await User.findOne({username:username}).exec()
                    if(user){
                        if(bcrypt.compareSync(hash, user.hash)){
                            sendStatus({type: 'success', msg: `user ${username} sign in success!`}, ws)
                            sendData(['signIn', ""], ws)
                        }
                        else{
                            sendStatus({type: 'error', msg: `user ${username}'s password is incorrect!'`}, ws)
                        }
                    }
                    else{
                        sendStatus({type: 'error', msg: `user ${username} doesn't exist!`}, ws)
                    }
                    break
                }
                case 'signUp':{
                    const {username, hash} = payload
                    const user = await User.findOne({username:username}).exec()
                    if(user){
                        sendStatus({type: 'error', msg: `user ${username} has already existed!`}, ws)
                    }
                    else{
                        const encryptedHash = bcrypt.hashSync(hash, 10)
                        const newUser = new User({username, hash: encryptedHash})
                        console.log([username, hash])
                        await newUser.save()
                        sendStatus({type: 'success', msg: `${username} sign up success!`}, ws)
                    }
                    break
                }
                case 'createChatRoom':{
                    const {}
                    break
                }
                case 'clear':{
                    Message.deleteMany({}, ()=> {
                        broadcastMessage(['cleared'],{type: 'info', msg: 'Message cache cleared.'})
                    })
                    break
                }
                default: break
            }
        }
    })
    const PORT = process.env.port || 4000
    server.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    })
})