const Mutation = {
    createUser: async(parent, {input}, {userModel, pubSub}) => {
        try{
            const user = await userModel.findOne({id: input.id})
            if(user){
                const updatedUser = userModel.findOneAndUpdate({id: user.id}, 
                    {$set: {
                        songID: input.songID,
                        songName: input.songName
                        },
                    $currentDate:{
                        lastModifiedDate: true
                    }
                    },{
                        returnDocument: "after"
                    })
                pubSub.publish("USER_UPDATED", {
                    userUpdated: updatedUser
                })
                return updatedUser
            }
            else{
                const newUser = userModel({...input, lastModifiedDate: Date.now()})
                await newUser.save()
                pubSub.publish("USER_CREATED", {
                    userCreated: newUser
                })
                return newUser
            }
        } catch (e){
            console.log(e)
        }
    },
    updateUser: async(parent, {input}, {userModel, pubSub}) => {
        try{
            const user = await userModel.findOne({id: input.id})
            if(user){
                const updatedUser = userModel.findOneAndUpdate({id: user.id}, 
                    {$set: {
                        songID: input.songID,
                        songName: input.songName
                        },
                    $currentDate:{
                        lastModifiedDate: true
                    }
                    },{
                        returnDocument: "after"
                    })
                pubSub.publish("USER_UPDATED", {
                    userUpdated: updatedUser
                })
                return updatedUser
            }
            else{
                const newUser = userModel({...input, lastModifiedDate: Date.now()})
                await newUser.save()
                pubSub.publish("USER_CREATED", {
                    userCreated: newUser
                })
                return newUser
            }
        } catch (e){
            console.log(e)
        }
    },
    deleteUser: async(parent, {id}, {userModel, pubSub}) => {
        try {
            await userModel.deleteOne({id:id})
            pubSub.publish("USER_DELETED", {
                userDeleted: id
            })
        } catch (e){
            console.log(e)
        }
        return id
    }
}

export default Mutation;