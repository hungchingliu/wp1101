import axios from 'axios'

const instance = axios.create ({baseURL: 'http://localhost:4000/api/guess'})

export const startGame = async () => {
    const { data: {msg} } = await instance.post('/start')
    return msg
}

export const guess = async (number) => {
    try {
        const { data: { msg } } = await instance.get('/guess', { params: { number } })
        return msg
    }
    catch (error){
        return "Error: \"" + number + "\" is not a valid number (1-100)"
    }
}

export const restart = async() => {
    const { data: {msg}} = await instance.post('/restart')
    return msg
}


