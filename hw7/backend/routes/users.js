import route from 'color-convert/route'
import express from 'express'
import {deleteDB, saveUser, updateUser, queryUser} from '../mongo'

const router = express.Router()

router.post('/create-card', async(req, res) => {
    
    var {name, subject, score} = req.body
    try {
        score = Number(score)
    } 
    catch(e){
        console.log("score is no a number")
        console.log(e)
        res.status(406).send({message: "score is not a legal number"})
    }
    
    try {
        let ret = await saveUser(name, subject, score)
        if(ret === "exist"){
            
            res.json({message: `Updating (${name}, ${subject}, ${score})`})
        }
        else{
            res.json({message: `Adding (${name}, ${subject}, ${score})`})
        }
    }
    catch(e){
        console.log(e)
    }
})

router.get('/query-cards', async(req, res) => {
    console.log(req.query)
    const {messages, message} = await queryUser(req.query.type, req.query.queryString)
    console.log([messages, message])
    res.json({messages: messages, message: message})
})

router.delete('/clear-db', (req, res) => {
    deleteDB()
    res.json({message: "Database cleared"})
})

export default router