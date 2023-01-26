export const Square=({children,isSelected,updateBoard,index})=>{
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