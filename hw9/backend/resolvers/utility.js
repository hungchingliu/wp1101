const checkUser = (db, name, errFunc) => {
    if(!name)
        throw new Error("Missing user name for " + errFunc)
    return db.User.findOne({name}).exec()
}

const newUser = (db, name) => {
    return new db.User({name}).save()
}

const makeName = (name1, name2) => {
    if(!name1 || !name2)
        throw new Error("Missing user name " + "name1: " + name1 + 
        "name2: " + name2)

    if(name1 > name2)
        [name1, name2] = [name2, name1]
    
    return name1 + "_" + name2
}

const checkChatBox = (db, name, errFunc) => {
    if(!name)
        throw new Error("Missing chatbox name for " + errFunc)
    return db.ChatBox.findOne({name}).exec()
}

const newChatBox = (db, chatBoxName) => {
    return new db.ChatBox({ name: chatBoxName}).save()
}

const newMessage = async (db, chatBoxName, sender, body) => {
    if(!chatBoxName)
        throw new Error("Missing chatbox name for new Message")
    if(!sender)
        throw new Error("Missing sender name for new Message")
    if(!body)
        throw new Error("Missing message body for new Message")
    
    const user = await checkUser(db, sender, "newMessage")
    if(!user)
        throw new Error("user: " + sender + "doen't exist for newMessage")
    const uId = user._id
   
    const message = await db.Message({sender: uId, body:body}).save()
    const mId = message._id
    const ret = await db.ChatBox.updateOne(
        {name: chatBoxName},
        { $push: {messages: mId}}).exec()
    if(!ret.matchedCount)
        throw new Error(chatBoxName + "chatBoxName doesn't exist for new Message")
    return db.Message.findOne({_id: mId}).populate('sender').exec()
    
}

export {
    checkUser,
    newUser,
    makeName,
    checkChatBox,
    newChatBox,
    newMessage
}
