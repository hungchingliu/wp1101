import styled from 'styled-components'
import {message} from 'antd'
import useChatRoom from '../Hooks/useChatRoom'
import { useEffect, useState, useCallback} from 'react'
import ChatRoom from './ChatRoom'
import SignIn from './SignIn'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION} from '../graphql/index'

const StyledApp = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
width: 500px;
margin: auto;
`;

const LOCALSTORAGE_KEY = "save-me"



function App() {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY)
  const { status, setStatus } = useChatRoom()
  const [me, setMe] = useState(savedMe || '')
  const [body, setBody] = useState('') 
  const [signIn, setSignedIn] = useState(false)
  const [newChatUser, setNewChatUser] = useState('')
  const [activeKey, setActiveKey] = useState()
  const [panes, setPanes] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [createChatBox] = useMutation(CREATE_CHATBOX_MUTATION)
  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION)
  
  const displayStatus = (payload) => {
    if (payload.msg){
      const {type ,msg} = payload
      const content = {
        content: msg, duration: 0.5}
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
          message.error(content)
          break
        case 'info':
          message.success(content)
          break;
        default: break;

      }
    }
  }
  useEffect( () => {displayStatus(status)}, [status])
  useEffect( () => {
    if (signIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me)
    }
  }, [signIn, me])
  
  const createChatRoom = async () => {
    if(!me || !newChatUser) return
    const data = await createChatBox({
      variables: {
        name1: me,
        name2: newChatUser
      }
    })

    setShowModal(false)
    setNewChatUser('')
    
    const {error, data:{createChatBox:{messages, name}}} = data
    if(!error){
      const activeKey = name;
      const newPanes = [...panes];
      console.log(messages)
      newPanes.push({ title: newChatUser, content: messages, key: activeKey });
      setStatus({type: "success", msg: "ChatBox created"})
      setPanes(newPanes)
      setActiveKey(activeKey)
      
    }
    else {
      setStatus({type: "error", msg: "Fail to create ChatBox"})
      console.log(error)
    }
    
  }

  const sendMessage = async (msg) => {
    if(!activeKey){
      setStatus({type: "error", msg: "No ChatBox selected"})
      return;
    } 
    const data = await createMessage({
      variables:{
        chatBoxName: activeKey,
        sender: me,
        body: msg
      }
    })
    const {error} = data
    if(!error){
      setStatus({type: "success", msg: "Message sent"})
    }
    else {
      setStatus({type: "error", msg: "Fail to sent message"})
      console.log(error)
    }
  }
    
  return (
    <StyledApp>
      {signIn?
        <ChatRoom 
          me={me}
          body={body}
          setBody={setBody}
          newChatUser={newChatUser}
          setNewChatUser={setNewChatUser}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          panes={panes}
          setPanes={setPanes}
          showModal={showModal}
          setShowModal={setShowModal}
          displayStatus={displayStatus}
          sendMessage={sendMessage} 
          createChatRoom={createChatRoom} />
        :<SignIn
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn} 
          dislayStatus={displayStatus}/>}
    </StyledApp>
  )
}

export default App
