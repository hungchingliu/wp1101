import { useEffect } from 'react'
import { Tag, Tabs } from 'antd'
import { useQuery } from '@apollo/client'
import { CHATBOX_QUERY, CHATBOXMESSAGES_SUBSCRIPTION } from '../graphql'
const { TabPane } = Tabs

const ChatBox = ({pane, setPane, me, chatBoxName}) => {
    
    const { loading, error, data, subscribeToMore} = useQuery(CHATBOX_QUERY, {variables: {chatBoxName: chatBoxName}})
    
    useEffect( () => {
        try {
            subscribeToMore({
                document: CHATBOXMESSAGES_SUBSCRIPTION,
                variables: {chatBoxName: chatBoxName},
                updateQuery: (prev, { subscriptionData }) => {
                    console.log(prev)
                    if(!subscriptionData) return prev
                    const newMessage = subscriptionData.data.chatBoxMessages.message
                    console.log(subscriptionData)
                    return {
                        ...prev, 
                        chatBox:
                        {...prev.chatBox, messages: [...prev.chatBox.messages, newMessage]}
                    }
                }
            })
        } catch (e){} }, [subscribeToMore])

    return (
        <>
        {loading?<></>:
            data.chatBox.messages.map(({sender, body}, i) => { 
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
            }})
        }
        
        </>
    )
}

export default ChatBox