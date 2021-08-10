import React from 'react'
import styled from 'styled-components'
import Square from './Square'

const BoardRow = styled.div`
  &:after {
    clear: both;
    content: "";
    display: table;
  }
`;

const Board = ({ squares, onClick, squaresHighlight }) => {
  const renderSquare = (i) => {
    const isHighlight = squaresHighlight.includes(i);
    return (
      <Square 
        value={squares[i]} 
        onClick={() => onClick(i)}
        isHighlight={isHighlight}
        key={i}
      />
    )
  }

  const renderBoard = () => {
    let board = [];
    for (let x = 0; x < 3; x++) {
      let squares = [];
      const start = x * 3;
      const end = start + 3;
      for (let y = start; y < end; y++) {
        squares.push(renderSquare(y));
      }
      board.push(
        <BoardRow key={x}>
          {squares}
        </BoardRow>
      );
    }
    return board;
  }

  return (
    <div>
      {renderBoard()}
    </div>
  )
}

export default Board;