import http from 'http'
import express from 'express'
import dotenv from 'dotenv-defaults'
import mongoose from 'mongoose'
import WebSocket from 'ws'
import Message from './models/message'
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
    wss.on('connection', (ws) => {
        initData(ws)
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