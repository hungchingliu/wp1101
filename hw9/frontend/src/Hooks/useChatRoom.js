import { useState } from "react";

const useChatRoom = () => {
    const [messages, setMessages] = useState([])
    const [status, setStatus] = useState({})
    
    
    const sendData = async (data) => {
        //await client.send(JSON.stringify(data))
    }
    const sendMessage = (payload) => {
        //sendData(["input", payload])
    }

    const clearMessages = () => {
        //sendData(["clear"])
    }
    /*
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
            case "cleared":{
                setMessages([])
                break;
            }
            default: break

        }
    }
    */
    return {
        status, 
        messages,
        setStatus,
        sendMessage,
        clearMessages
    }
}

export default useChatRoom