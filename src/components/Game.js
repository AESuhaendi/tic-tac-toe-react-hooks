import React, { useState } from 'react'
import Board from './Board'
import { isGameDraw, calculateWinner, formatMoveToColRow } from '../utils/Utils'
import styled, { css } from 'styled-components';

const StyledGame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 10px;
`;

const GameBoard = styled.div``;

const GameInfo = styled.div`
  margin-left: 20px;
`;

const StatusPlayer = styled.div`
  margin-bottom: 10px;
  font-size: 28px;
`;

const StatusSort = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
`;

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  padding: 0.25em 1em;
  font-size: 12px;
`;

const ListMove = styled.ol`
  padding-left: 30px;
`;

const ListItemMove = styled.li`
  padding-bottom: 5px;
`;

const ButtonMove = styled(StyledButton)`
  width: 200px;
  font-size: 16px;

  ${props => props.isBold && css`
    background: palevioletred;
    color: white;
    font-weight: bolder;
  `}
`;

const Game = () => {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
    move: null
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isSortAsc, setIsSortAsc] = useState(true);

  const handleClick = (i) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();
    const [winner] = calculateWinner(squares);
    if (winner || squares[i])
      return;
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(currentHistory.concat([{
      squares: squares,
      move: i
    }]));
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const [winner, squaresHighlight] = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      `Go to move #${move} ${formatMoveToColRow(step.move)}` :
      'Go to game start';

    return (
      <ListItemMove key={move}>
        <ButtonMove
          isBold={move === stepNumber}
          onClick={() => jumpTo(move)}
        >{desc}</ButtonMove>
      </ListItemMove>
    )
  });

  if (!isSortAsc) {
    moves.reverse();
  }

  const sortMoves = () => {
    return (
      <StyledButton 
        onClick={() => setIsSortAsc(!isSortAsc)}
      >
        {isSortAsc ? 'Ascending' : 'Descending'}
      </StyledButton>
    )
  };

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    if (isGameDraw(current.squares)) {
      status = 'No One Wins';
    } else {
      status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
    }
  }

  return (
    <StyledGame>
      <GameBoard>
        <Board
          squares={current.squares}
          squaresHighlight={squaresHighlight}
          onClick={(i) => handleClick(i)}
        />
      </GameBoard>
      <GameInfo>
        <StatusPlayer>{status}</StatusPlayer>
        <StatusSort>{'Sorted: '}{sortMoves()}</StatusSort>
        <ListMove>{moves}</ListMove>
      </GameInfo>
    </StyledGame>
  )
}

export default Game;