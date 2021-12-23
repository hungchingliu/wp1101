import {useState } from "react";
import { createHash } from "crypto";
const client = new WebSocket('ws://localhost:4000')
const encrypt = (password) => {
    return createHash('sha256').update(password).digest('hex')
}
const useChat = () => {
    const [messages, setMessages] = useState([])
    const [status, setStatus] = useState({})
    const [signedIn, setSignedIn] = useState(false)
    
    const sendData = async (data) => {
        await client.send(JSON.stringify(data))
    }
    const sendMessage = (payload) => {
        sendData(["input", payload])
    }

    const clearMessages = () => {
        sendData(["clear"])
    }

    const sendSignIn = (name, password) => {
        const hash = encrypt(password)
        sendData(["signIn", {username: name, hash: hash}])
    }

    const sendSignUp = (name, password) => {
        const hash = encrypt(password)
        console.log(hash)
        sendData(["signUp", {username: name, hash: hash}])
    }

    client.onmessage = (byteString) => {
        const {data} = byteString
        const [task, payload] = JSON.parse(data)
        console.log([task, payload])
        switch (task) {
            case "output" : {
                setMessages(() => [...messages, ...payload])
                break;
            }
            case "status": {
                setStatus(payload);break;
            }
            case "init": {
                setMessages( () => payload)
                break;
            }
            case "signIn":{
                setSignedIn(true);
            }
            case "cleared":{
                setMessages([])
                break;
            }
            default: break

        }
    }
    return {
        status, 
        messages,
        signedIn,
        sendMessage,
        clearMessages,
        sendSignIn,
        sendSignUp
    }
}

export default useChat