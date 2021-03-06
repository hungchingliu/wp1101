/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import createBoard from '../util/createBoard';
import { revealed } from '../util/reveal';
import './css/Board.css'


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        {/* -- TODO 3-1 -- */}
        {/* Useful Hint: createBoard(...) */}
        let newBoard, newMineLocations, ret
        ret = createBoard(boardSize, mineNum)
        newBoard = ret.board
        newMineLocations = ret.mineLocations
        setBoard(board => newBoard)
        setMineLocations(minLocations => newMineLocations)
        setNonMineCount(nonMineCount => boardSize * boardSize - mineNum)
        
    }

    const restartGame = () => {
        {/* -- TODO 5-2 -- */}
        {/* Useful Hint: freshBoard() */}
        
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        {/* -- TODO 3-2 -- */}
        {/* Useful Hint: A cell is going to be flagged. 'x' and 'y' are the xy-coordinate of the cell. */}
        {/* Reminder: If the cell is already flagged, you should unflagged it. Also remember to update the board and the remainFlagNum. */}
        {/* Reminder: The cell can be flagged only when it is not revealed. */}
        const newArray = JSON.parse(JSON.stringify(board))
        newArray[x][y].flagged = !newArray[x][y].flagged
        if(board[x][y].flagged === true)
            setRemainFlagNum(remainFlagNum => remainFlagNum - 1)
        else
            setRemainFlagNum(remainFlagNum => remainFlagNum + 1)
        setBoard(newArray)
        
        
        
    };

    const revealCell = (x, y) => {
        {/* -- TODO 4-1 -- */}
        {/* Reveal the cell */}
        {/* Useful Hint: The function in reveal.js may be useful. You should consider if the cell you want to reveal is a location of mines or not. */}
        {/* Reminder: Also remember to handle the condition that after you reveal this cell then you win the game. */}
        
        if(board[x][y].revealed === true || board[x][y].flagged === true){
            return;
        }
        if(win || gameOver)
            return;
        console.log("click")
        if(board[x][y].value === '💣'){
            setGameOver(gameOver => true)
        }
        else{
            const newArray = JSON.parse(JSON.stringify(board))
            newArray[x][y].revealed = true;
            
            setBoard(newArray)
            setNonMineCount(nonMineCount => nonMineCount)

        }
        if(nonMineCount === 0){
            setWin(true)
        }
        
        
    };

    

    return(
        <div className = 'boardPage' >
            <div className = 'boardWrapper' >
             
            
            {/* -- TODO 3-1 -- */}
            {/* Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.  */}
            {/* Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
            <div className = "boardContainer">
                <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver}/>
                {   
                    
                    board.map((ele, id) => {
                        return(<div key = {id} id={"row"+id} style={{display:"flex"}}>
                            {ele.map((e, eid) => {
                                return (<Cell key = {eid} rowIdx={e.x} colIdx={e.y} detail={e} updateFlag={updateFlag} revealCell={revealCell}/>
                                )
                            })}
                        </div>)
                    })  

                }
            </div>
            </div>
            {(gameOver || win)?<Modal/>:<></>}
        </div>
    ); 

    

}

export default Board