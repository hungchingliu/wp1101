import Message from './Message'
import Title from './Title'
import { Button, Input, Tabs, Row, Col, Badge } from 'antd'
import ChatRoomModal from './ChatRoomModal'
import ChatBox from './ChatBox'
import { useState } from 'react'
const { TabPane } = Tabs


const ChatRoom = ({me,
  body, setBody, 
  newChatUser, setNewChatUser,
  activeKey, setActiveKey,
  panes, setPanes,
  showModal, setShowModal,
  displayStatus, sendMessage, clearMessages, createChatRoom}) => {
  
  const [focused, setFocused] = useState(false)

  const onChange = activeKey => {
    setActiveKey(activeKey)
  };

  const onEdit = (targetKey, action) => {
    if(action === 'add'){
      add()
    }
    else if(action === 'remove'){
      remove(targetKey)
    }
  };

  const add = () => {
    setShowModal(true)
  };
  
  const remove = targetKey => {
    
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes)
    setActiveKey(newActiveKey)
  };

  const onFocus = () => {
    setFocused(true)
  }

  const onBlur = () => {
    setFocused(false)
  }
  return (
    <>
      <Title>
        <h1>{me}'s Chat</h1>
      </Title>
      <Message>
        <ChatRoomModal visible={showModal}
         createChatRoom={createChatRoom}
         hideModal={() => {setShowModal(false)}}
         newChatUser={newChatUser}
         setNewChatUser={setNewChatUser} />
        <Tabs
          type="editable-card"
          onChange={onChange}
          activeKey={activeKey}
          onEdit={onEdit}
        >
        {panes.map(pane => (
          
          <TabPane 
            tab={
              <>
              <Badge count={pane.unseen} size="small"></Badge>
                <span> {pane.title}</span>
                </>
            } 
            key={pane.key} closable={pane.closable}>
            {
              
              <ChatBox pane={pane} me={me} chatBoxName={pane.key} activeKey={activeKey} boxKey={pane.key} panes={panes} setPanes={setPanes} focused={focused} />
              
              }
          </TabPane>
          
        ))}
        </Tabs>
      </Message>
      <Row>
        <Col span={22}>
          <Input.Search
            value={body}
            onChange={(e) => setBody(e.target.value)}
            enterButton="Send"
            placeholder="Type a message here..."
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={(msg) => {
              if(!msg){
                displayStatus({
                  type: 'error',
                  msg: 'Please enter a username and a message body.'
                })
                return
              }
              sendMessage(msg)
              setBody('')
            }}
          ></Input.Search>
        </Col>
        <Col span={2}>
          <Button type="primary" danger onClick={clearMessages}>
            Clear
          </Button>
        </Col>
      </Row>
    </>
  )}

export default ChatRoom
