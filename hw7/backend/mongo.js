import User from './models/user'

export const saveUser = async (name, subject, score) => {
    const existing = await User.findOne({name: name, subject: subject})
    if(existing){ 
        console.log(`data ${name} ${subject} exists!!`)
        updateUser(name, subject, score)
        return "exist"
    }
    try{
        const newUser = new User({name, subject, score})
        console.log("Create user", newUser)
        await newUser.save()
        return "new"
    } catch(e){ throw new Error("User creation error: " + e)}
}

export const updateUser = async (name, subject, score) => {
    try{
        const afterUpdate = await User.findOneAndReplace({name: name, subject: subject}, {name: name, subject: subject, score: score}, {new: true})
        console.log("Update user", afterUpdate)
    }
    catch (e){
        throw new Error("User update error: " + e)
    }

}

export const queryUser = async(type, queryString) => {
    try {
        const query = User.find()
        query.where(type).equals(queryString)
        var ret = await query.exec()
        var messages, message
        if(ret.length === 0){
            message = `${type} (${queryString}) not found!`
        }
        else{
            message = ""
            messages = ret.map(ele => {
                const e = {name: ele.name, subject: ele.subject, score: ele.score}
                return JSON.stringify(e)
            })
        }
        return {messages: messages, message: message}
    }
    catch(e){
        throw new Error("Query error: " + e)
    }
}

export const deleteDB = async() => {
    try {
        await User.deleteMany({})
        console.log("Database deleted")
    }
    catch (e) { throw new Error("Database deletion failed")}
}




