const Query = {
    hello: () => { return "hello world!"},
    users: async(parent, {neLat, neLng, swLat, swLng, all}, {userModel}) => {
        try{
            if(all){
                const allUsers = await userModel.find()
                return allUsers
            }
            else{
                const users = await userModel.find({lat: {$gte: swLat, $lte: neLat},
                                                lng: {$gte: swLng, $lte: neLng}})
                    return users
                }
            } catch(e){
                console.log(e)
        }
    }
}

export default Query;