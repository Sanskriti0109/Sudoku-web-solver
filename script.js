const SIZE = 9;
const SUBGRIDSIZE = 3;
let board = Array(SIZE).fill().map(() => Array(SIZE).fill(0));

function createGrid() {
    const container = document.getElementById('grid-container');
    container.innerHTML = '';

    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 0;
            input.max = 9;
            input.value = board[row][col] === 0 ? '' : board[row][col];
            input.classList.add('input-box');
            input.id = `${row}-${col}`;
            input.addEventListener('input', (e) => {
                const val = e.target.value;
                board[row][col] = val === '' ? 0 : parseInt(val);
            });
            container.appendChild(input);
        }
    }
}

function solveSudoku() {
    if (solve(board)) {
        displaySolution();
    } else {
        alert('No solution found');
    }
}

function solve(board) {
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= SIZE; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(board, row, col, num) {
    for (let c = 0; c < SIZE; c++) {
        if (board[row][c] === num) return false;
    }

    for (let r = 0; r < SIZE; r++) {
        if (board[r][col] === num) return false;
    }

    const startRow = row - row % SUBGRIDSIZE;
    const startCol = col - col % SUBGRIDSIZE;
    for (let r = 0; r < SUBGRIDSIZE; r++) {
        for (let c = 0; c < SUBGRIDSIZE; c++) {
            if (board[startRow + r][startCol + c] === num) return false;
        }
    }

    return true;
}

function displaySolution() {
    const container = document.getElementById('grid-container');
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            const input = document.getElementById(`${row}-${col}`);
            input.value = board[row][col] === 0 ? '' : board[row][col];
            input.classList.add('solved-box');
            input.disabled = true;
        }
    }
}

window.onload = createGrid;
