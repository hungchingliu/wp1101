import Message from './Message'
import Title from './Title'
import { Button, Input, Tabs, Tag } from 'antd'
import ChatRoomModal from './ChatRoomModal'
import ChatBox from './ChatBox'

const { TabPane } = Tabs


const ChatRoom = ({me, messages, 
  body, setBody, 
  newChatUser, setNewChatUser,
  activeKey, setActiveKey,
  panes, setPanes,
  showModal, setShowModal,
  displayStatus, sendMessage, clearMessages, createChatRoom}) => {
  
  
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

  return (
    <>
      <Title>
        <h1>{me}'s Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
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
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            {
              <ChatBox pane={pane} me={me} chatBoxName={pane.key} />
              }
          </TabPane>
        ))}
        </Tabs>
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
          sendMessage(msg)
          setBody('')
        }}
      ></Input.Search>
    </>
  )}

export default ChatRoom