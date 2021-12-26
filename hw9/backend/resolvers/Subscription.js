import { checkChatBox } from "./utility"
const Subscription = {
    chatBoxMessages: {
        async subscribe(parent, {chatBoxName}, {db, pubsub}, info){
            const chatBox = await checkChatBox(db, chatBoxName, "Subscriptions on ChatBox messages")
            if(!chatBox){
                throw new Error('ChatBox not found')
            }
            return pubsub.asyncIterator(chatBoxName)
        }
    }
}

export default Subscription