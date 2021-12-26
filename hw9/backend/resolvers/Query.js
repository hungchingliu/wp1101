import ChatBox from "./ChatBox";
import { checkChatBox } from "./utility"
const Query = {
    async chatBox(parent, {chatBoxName}, {db, pubsub}, info){
        if(!chatBoxName)
            throw new Error(`missing ${chatBoxName} for chatbox Query`)
        let chatBox = await checkChatBox(db, chatBoxName, "queryChatBox");
        if(!ChatBox)
            throw new Error(`${chatBoxName} doesn't exist in db for query chatbox`)
        return chatBox
    }
}

export default Query