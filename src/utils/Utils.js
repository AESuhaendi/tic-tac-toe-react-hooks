export function isGameDraw(squares) {
  for (let x = 0; x < squares.length; x++) {
    const square = squares[x];
    if (square ===  null) {
      return false;
    }
  }
  return true;
}

export function formatMoveToColRow(move) {
  if (move === null) return '';
  const cols = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];
  let col;
  for (let x = 0; x < cols.length; x++) {
    if (cols[x].includes(move)) {
      col = x + 1;
      break;
    }
  }
  const rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];
  let row;
  for (let x = 0; x < rows.length; x++) {
    if (rows[x].includes(move)) {
      row = x + 1;
      break;
    }
  }
  return `(${col}, ${row})`;
}

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return [null, []];
}