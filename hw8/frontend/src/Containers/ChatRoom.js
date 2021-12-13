import Message from './Message'
import Title from './Title'
import { Button, Input, Tag } from 'antd'




const ChatRoom = ({me, messages, body, setBody, displayStatus, sendMessage, clearMessages}) => {
  

  return (
    <>
      <Title>
        <h1>{me}'s Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </Title>
      <Message>
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
      </Message>
      <Input.Search
        value={body}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if(!msg){
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }
          sendMessage({name: me, body:msg})
          setBody('')
        }}
      ></Input.Search>
    </>
  )}

export default ChatRoom
