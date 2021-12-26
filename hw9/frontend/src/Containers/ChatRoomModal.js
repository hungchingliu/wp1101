import { Modal, Input } from 'antd';

const ChatRoomModal = ({visible, createChatRoom, hideModal, newChatUser, setNewChatUser}) => {

    return (
        <>
          <Modal
            title="Create a new chat room"
            visible={visible}
            onOk={createChatRoom}
            onCancel={hideModal}
            okText="Create"
            cancelText="Cancel"
          >
            * Name
            <Input 
              placeholder="user"
              value={newChatUser}
              onChange={(e)=> {setNewChatUser(e.target.value)}}
             />
          </Modal>
          
        </>
    );
}

export default ChatRoomModal