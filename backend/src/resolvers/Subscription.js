const Subscription = {
    userCreated: {
        subscribe: (parent, args, {pubSub}) => {
            return pubSub.asyncIterator("USER_CREATED")
        }
    },
    userUpdated: {
        subscribe: (parent, args, {pubSub}) => {
            return pubSub.asyncIterator("USER_UPDATED")
        }
    },
    userDeleted: {
        subscribe: (parent, args, {pubSub}) => {
            return pubSub.asyncIterator("USER_DELETED")
        }
    }
}

export default Subscription