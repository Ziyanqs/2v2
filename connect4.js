const rows = 6;
const cols = 7;
let currentPlayer = 'red';
const board = [];

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');

// Initialize the game board
function createBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let col = 0; col < cols; col++) {
            board[row][col] = null;
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleMove);
            boardElement.appendChild(cell);
        }
    }
}

// Handle player moves
function handleMove(event) {
    const col = event.target.dataset.col;
    for (let row = rows - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            const piece = document.createElement('div');
            piece.classList.add('piece', currentPlayer);
            document.querySelector(`[data-row='${row}'][data-col='${col}']`).appendChild(piece);
            if (checkWin(row, col)) {
                statusElement.innerText = `Player ${currentPlayer === 'red' ? '1 (Red)' : '2 (Yellow)'} Wins!`;
                boardElement.style.pointerEvents = 'none';
            } else {
                switchPlayer();
            }
            break;
        }
    }
}

// Switch player turn
function switchPlayer() {
    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    statusElement.innerText = `Player ${currentPlayer === 'red' ? '1 (Red)' : '2 (Yellow)'}'s turn`;
}

// Check for a winning combination
function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) || // Horizontal
           checkDirection(row, col, 0, 1) || // Vertical
           checkDirection(row, col, 1, 1) || // Diagonal down-right
           checkDirection(row, col, 1, -1);  // Diagonal up-right
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        const r = row + i * rowDir;
        const c = col + i * colDir;
        if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

// Reset the game
function resetGame() {
    currentPlayer = 'red';
    statusElement.innerText = "Player 1's turn (Red)";
    createBoard();
}

createBoard();
