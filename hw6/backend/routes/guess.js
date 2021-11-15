import express from 'express'
import { getNumber, genNumber } from '../core/getNumber.js'

const router = express.Router()


router.post('/start', (_, res) => {
            genNumber()
            res.json({ msg: 'The game has started.' })
        }
)

router.get('/guess', (req, res) => {
    const number = getNumber()
    const guessed = Number(req.query.number)

    if(!guessed || guessed < 1 || guessed > 100){
        res.status(406).send({ msg: 'Not a legal number.' })
    }
    else if (number === guessed){
        res.json({ msg: "Equal"})
    }
    else if (guessed < number){
        res.json({ msg: "Bigger"})
    }
    else if( guessed > number){
        res.json({ msg: "Smaller"})
    }
})

router.post('/restart', (_, res) => {
    res.json({msg: "The game has restarted"})
    genNumber()
})

export default router

