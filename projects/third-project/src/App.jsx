import { useState } from "react";

const TURNS = {
  x: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClic = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClic} className={className}>
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.x);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    //no actualiza el contenido de la posicion si ya tiene contenido
    if (board[index]) return;
    //actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn; // x u o
    setBoard(newBoard);
    //ACTUALIZA EL TURNO
    const newTurn = turn === TURNS.x ? TURNS.O : TURNS.x;
    setTurn(newTurn);
  };

  return (
    <main className="board">
      <h1>putito</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default App;
