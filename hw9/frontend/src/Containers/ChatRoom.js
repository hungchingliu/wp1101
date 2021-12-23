import Message from './Message'
import Title from './Title'
import { Button, Input, Tabs, Tag } from 'antd'
import { useState } from 'react'

const { Tabpane } = Tabs
const { TabPane } = Tabs


const initialTabState = {
  activeKey: null,
  panes: [],
}

const ChatRoom = ({me, messages, body, setBody, displayStatus, sendMessage, clearMessages}) => {
  
  const [activeKey, setActiveKey] = useState()
  const [panes, setPanes] = useState([])
  const [newTabIndex, setNewTabeIndex] = useState(0)
  
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
    setNewTabeIndex(newTabIndex + 1)
    const activeKey = `newTab${newTabIndex}`;
    const newPanes = [...panes];
    newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
    setPanes(newPanes)
    setActiveKey(activeKey)
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
        <Tabs
          type="editable-card"
          onChange={onChange}
          activeKey={activeKey}
          onEdit={onEdit}
        >
          {panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
              {pane.content}
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
          sendMessage({name: me, body:msg})
          setBody('')
        }}
      ></Input.Search>
    </>
  )}

export default ChatRoom

/*
messages.map(({name, body}, i) => (
            <p className="App-message" key={i}>
              <Tag color = "blue">{name}</Tag>{body}
            </p>
          )
*/