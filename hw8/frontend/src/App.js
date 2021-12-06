import './App.css'
import { Button, Input, message ,Tag } from 'antd'
import useChat from './useChat'
import { useEffect, useState, useRef } from 'react'
function App() {
  const { status, messages, sendMessage, clearMessages } = useChat()
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('') 
  const bodyRef = useRef(null)
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
  useEffect( () => {
    displayStatus(status)}, [status])

  return (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ? (
        <p style={{ color: '#ccc' }}>
          No messages...
        </p> ) : (
          messages.map(({name, body}, i) => (
            <p className="App-message" key={i}>
              <Tag color = "blue">{name}</Tag>{body}
            </p>
          ))
        )
        }
      </div>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
        onKeyDown={(e) => {
          if(e.key === 'Enter'){
            bodyRef.current.focus()
          }
        }}
        style={{ marginBottom: 10 }}
      ></Input>
      <Input.Search
        value={body}
        ref={bodyRef}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if(!msg || !username){
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }
          sendMessage({name:username, body:msg})
          setBody('')
        }}
      ></Input.Search>
    </div>
  )
}

export default App
