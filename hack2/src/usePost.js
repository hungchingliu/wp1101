import {useState} from 'react'

const usePost = () => {
    const [posts, setPosts] = useState([])

    
    return {
        posts
    }
}

export default usePost