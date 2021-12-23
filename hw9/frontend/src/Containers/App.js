import styled from 'styled-components'
import {message} from 'antd'
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
function App() {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY)
  const { status, messages, signedIn, sendMessage, clearMessages, sendSignIn, sendSignUp} = useChat()
  const [me, setMe] = useState(savedMe || "")
  const [password, setPassword] = useState()
  const [body, setBody] = useState('') 
  
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
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me)
    }
  }, [signedIn, me])
  
  const signIn = (me, password) => {
    if (!me){
        displayStatus({
            type: "error",
            msg: "Missing user name"
        })
        return
    }

    if(!password){
      displayStatus({
        type: "error",
        msg: "Missing password"
      })
      return
    }

    sendSignIn(me, password)
  }

  const signUp = (me, password) => {
    if (!me){
      displayStatus({
          type: "error",
          msg: "Missing user name"
      })
      return
    }

    if(!password){
      displayStatus({
        type: "error",
        msg: "Missing password"
      })
      return
    }

    sendSignUp(me, password)
}
    
  return (
    <StyledApp>
      {signedIn?
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
          password={password}
          setPassword={setPassword}
          signIn={signIn}
          signUp={signUp} 
          dislayStatus={displayStatus}/>}
    </StyledApp>
  )
}

export default App
