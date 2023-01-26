import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./componets/Square"
import { TURNS,WINNER_COMBOS } from "./constants"
import { checkWinnerFrom,checkEndGame } from "./logical/board"
import { WinnerModal } from "./componets/WinnerModal"

function App() {
  const [board,setBoard]=useState(Array(9).fill(null))
  const [turn,setTurn]=useState(TURNS.X)
  const [winner,setWinner]=useState(null);

  //Reiniciar Guego
  const resetGame=()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
}

  const updateBoard=(index)=>{
    //QUE NO SE ACTRUALIZE EL TURNO EXISTENTE
    if(board[index] || winner) return // if exiist any then return
    //aCTUAIZAR EL TABLERO
    const newBoard=[...board] //el estado nunca debe ser inmutable si no que debe agregarse otro array
    newBoard[index]=turn
    setBoard(newBoard)
 //CAMBIAR EN TURNNO
    const newTurn= turn ===TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner=checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }
  return (
    <main className="board">
     <h2>3 en Raya</h2>
     <button onClick={resetGame}>Empezar de nuevo</button>
      <section className="game">
        {
          board.map((_,index)=>{
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
              {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn ===TURNS.X}>
            {TURNS.X}
        </Square>
        <Square isSelected={turn ===TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
        <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
