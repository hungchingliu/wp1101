import { useEffect } from 'react'
import { Tag, Divider, message } from 'antd'
import { useQuery, useSubscription } from '@apollo/client'
import { CHATBOX_QUERY, CHATBOXMESSAGES_SUBSCRIPTION } from '../graphql'
import { useState } from 'react'

const ChatBox = ({me, chatBoxName, activeKey, boxKey, panes, setPanes, focused}) => {
    
    const { loading, data} = useQuery(CHATBOX_QUERY, {variables: {chatBoxName: chatBoxName}})
    useSubscription(
        CHATBOXMESSAGES_SUBSCRIPTION,
        {
            variables:{chatBoxName:chatBoxName},
            onSubscriptionData: ({subscriptionData:{data}}) => {
                if(data.chatBoxMessages.mutation === 'CREATED'){
                    const newMessage = data.chatBoxMessages.message
                    if(activeKey === boxKey){
                        setMessages(prev => [...prev, newMessage])
                    }
                    else {
                        setUnseenMessages(prev => [...prev, newMessage])
                        var id = panes.findIndex(pane => {return pane.key === boxKey})
                        const newPanes = JSON.parse(JSON.stringify(panes))
                        newPanes[id].unseen += 1
                        setPanes(newPanes)
                        
                    }

                }
                else if(data.chatBoxMessages.mutation === 'CLEARED'){
                    setMessages([])
                    setUnseenMessages([])
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

    useEffect( () => {
        if(boxKey === activeKey){
            var id = panes.findIndex(pane => {return pane.key === boxKey})
            const newPanes = JSON.parse(JSON.stringify(panes))
            newPanes[id].unseen = 0
            setPanes(newPanes)
            
        }

    }, [activeKey])

    useEffect( () => {
        if(focused === true){
            if(boxKey === activeKey){

                setMessages([...messages, ...unseenMessages])
                setUnseenMessages([])
                console.log([message, unseenMessages])
            }
            
        }
    }, [focused, activeKey])

    return (
        <>
        {messages?messages.map(({sender, body}, i) => { 
            if(sender.name === me){
                return (
                <p className="App-message" key={i} align="right">
                        {body + " "}<Tag color = "blue">{sender.name}</Tag>
                        </p>
                )
            } else {
                return (<p className="App-message" key={i}>
                        <Tag color = "blue">{sender.name}</Tag>{body}
                        </p>)
        }}):<></>}
        {unseenMessages.length?
            <Divider plain>Unseen Messages</Divider>
        :<></>}

        {unseenMessages?unseenMessages.map(({sender, body}, i) => { 
            if(sender.name === me){
                return (
                <p className="App-message" key={i} align="right">
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