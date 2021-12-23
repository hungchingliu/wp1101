import styled from 'styled-components'
import {message, Tabs} from 'antd'
import useChat from '../Hooks/useChat'
import { useEffect, useState} from 'react'
import ChatRoom from './ChatRoom'
import SignIn from './SignIn'

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
const { TabPane } = Tabs


function App() {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY)
  const { status, messages, sendMessage, clearMessages } = useChat()
  const [me, setMe] = useState(savedMe || '')
  const [body, setBody] = useState('') 
  const [signIn, setSignedIn] = useState(false)
  
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
  
    
  return (
    <StyledApp>
      {signIn?
        <ChatRoom 
          me={me} 
          messages={messages}
          body={body}
          setBody={setBody}
          displayStatus={displayStatus}
          sendMessage={sendMessage} 
          clearMessages={clearMessages} />
        :<SignIn
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn} 
          dislayStatus={displayStatus}/>}
    </StyledApp>
  )
}

export default App
