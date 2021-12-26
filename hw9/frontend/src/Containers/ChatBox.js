import { useEffect } from 'react'
import { Tag } from 'antd'
import { useQuery, useSubscription } from '@apollo/client'
import { CHATBOX_QUERY, CHATBOXMESSAGES_SUBSCRIPTION } from '../graphql'
import { useState } from 'react'

const ChatBox = ({me, chatBoxName}) => {
    
    const { loading, data} = useQuery(CHATBOX_QUERY, {variables: {chatBoxName: chatBoxName}})
    useSubscription(
        CHATBOXMESSAGES_SUBSCRIPTION,
        {
            variables:{chatBoxName:chatBoxName},
            onSubscriptionData: ({subscriptionData:{data}}) => {
                if(data.chatBoxMessages.mutation === 'CREATED'){
                    const newMessage = data.chatBoxMessages.message
                    setMessages(prev => [...prev, newMessage])
                }
                else if(data.chatBoxMessages.mutation === 'CLEARED'){
                    setMessages([])
                }
            }
        }
    )
    const [messages, setMessages] = useState([])
    const [unseenMessages, setUnseenMessages] = useState([])

    
    useEffect( () => {
        if(!loading){
            setMessages(data.chatBox.messages)
        }
    }, [loading])

    return (
        <>
        {messages?messages.map(({sender, body}, i) => { 
            if(sender.name === me){
                return (
                <p className="App-message" key={i}>
                        {body + " "}<Tag color = "blue">{sender.name}</Tag>
                        </p>
                )
            } else {
                return (<p className="App-message" key={i}>
                        <Tag color = "blue">{sender.name}</Tag>{body}
                        </p>)
        }}):<></>}
        </>
       
    )
}

export default ChatBox