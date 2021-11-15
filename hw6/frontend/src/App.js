import React, {useState, useEffect} from 'react'
import './App.css';
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const handleGuess = async () => {

    const response = await guess(number)
    if (response === 'Equal') setHasWon(true)
    else{
      setStatus(response)
      setNumber('')
    }
  }



  const startMenu = 
  <div>
    <button onClick = {
      async() => {
        setHasStarted(true)
        let msg = await startGame()
        setStatus(msg)
      }
    }> start game </button>
  </div>

  const gameMode = 
  <>
    <p>Guess a number between 1 to 100</p>
    <input onChange = {
      (event) => {
        setNumber(event.target.value)
      }
    }></input>
    <button
      onClick = {handleGuess}
      disabled={!number}
      >guess!
    </button>
    <p>{status}</p>
  </>

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button onClick = {async() => {
        setHasWon(false)
        let msg = await restart()
        setStatus(msg)

      }}>restart</button>
    </>
  )

  const game = <div>{hasWon ? winningMode : gameMode}</div>

  return (
    <div className="App">
        {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
