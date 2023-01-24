import { useState } from "react"

const TURNS={
  X: 'X',
  O: 'O'
}


const Square=({children,isSelected,updateBoard,index})=>{
  const className=`square ${isSelected ? 'is-selected' : ''}`

  const handleClick=()=>{
    updateBoard(index)
  }
  return(
    <deiv
      onClick={handleClick}  
      className={className}>
      {children}
    </deiv>
  )
}
const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
  
]

function App() {
  const [board,setBoard]=useState(Array(9).fill(null))
  const [turn,setTurn]=useState(TURNS.X)
  const [winner,setWinner]=useState(null);

  const checkWinner=(boardToCheck)=>{
    for(const combo of WINNER_COMBOS){
      const [a,b,c]=combo
      if(boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a]=== boardToCheck[c]){
          return boardToCheck[a]
        }
    }
    return null
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

    const newWinner=checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
      alert("el ganador es "+newWinner)
    }
  }
  return (
    <main className="board">
     <h2>hola quer tal</h2>
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
    </main>
  )
}

export default App
