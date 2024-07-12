let board;
let currentPlayer;
let gameActive;
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initializeGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
}

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    updateBoard(cellIndex);
    checkResult();
}

function updateBoard(index) {
    board[index] = currentPlayer;
    document.querySelector(`.cell[data-index='${index}']`).textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        message.textContent = 'Draw!';
        gameActive = false;
        return;
    }
}

resetBtn.addEventListener('click', initializeGame);

initializeGame();
