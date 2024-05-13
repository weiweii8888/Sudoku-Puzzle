/**
 * The above JavaScript code defines functions to create and solve a Sudoku grid, with the ability to
 * fill random numbers, validate user input, and determine cell colors.
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeGrid();
    fillRandomNumbers();
    document.getElementById('solve-btn').addEventListener('click', solve);
    document.getElementById('reset-btn').addEventListener('click', reset);
    document.getElementById('newGame-btn').addEventListener('click', handleNewGameClick);
});

function handleNewGameClick() {
    console.log('Button clicked');  // Log when the button is clicked
    if (confirm('Do you want to start a new game?')) {
        console.log('Starting new game');  // Log when new game is confirmed
        newGame();
    } else {
        console.log('New game not started.');  // Log when new game is not started
    }
}

function newGame() {
    console.log('newGame function triggered');
    const inputs = document.querySelectorAll('#sudoku-grid input');
    inputs.forEach(input => {
        input.value = '';  // Clear all inputs
        input.disabled = false;  // Enable all inputs for editing
        input.classList.remove('system-generated');  // Remove the system-generated marking
        let index = parseInt(input.dataset.index);
        input.style.backgroundColor = determineColor(Math.floor(index / 9), index % 9);
    });
    fillRandomNumbers();  // Fill new random numbers
}

function initializeGrid() {
    const grid = document.getElementById('sudoku-grid');
    grid.innerHTML = '';
    for (let i = 0; i < 81; i++) {
        const row = Math.floor(i / 9);
        const col = i % 9;
        const input = document.createElement('input');
        input.type = 'number';
        input.min = 1;
        input.max = 9;
        input.dataset.index = i;  // Store index in data attribute for color determination
        input.style.backgroundColor = determineColor(row, col); // Set background color based on block
        input.oninput = function() {
            if (this.value.length > 1) this.value = this.value.slice(0, 1);
            validateInput(this, row, col);
        };
        grid.appendChild(input);
    }
}

function fillRandomNumbers() {
    const inputs = [...document.querySelectorAll('#sudoku-grid input')];
    const board = new Array(81).fill(0);  // Start with an empty board

    inputs.forEach((input, index) => {
        if (Math.random() < 0.2) {  // 20% chance to fill a cell
            let validFound = false;
            let attempts = 0;
            while (!validFound && attempts < 20) {
                const num = Math.ceil(Math.random() * 9);
                if (isValid(board, Math.floor(index / 9), index % 9, num)) {
                    input.value = num;
                    input.disabled = true;
                    input.classList.add('system-generated'); // Mark as system-generated
                    board[index] = num;
                    validFound = true;
                }
                attempts++;
            }
        }
    });
}


function solve() {
    const inputs = [...document.querySelectorAll('#sudoku-grid input')];
    const board = inputs.map(input => input.value ? parseInt(input.value) : 0);
    const solution_txt = document.getElementById('solution-txt');

    if (solveSudoku(board, 0, 0)) {
        // If the sudoku is solvable, fill the grid with the solved values
        inputs.forEach((input, index) => {
            input.value = board[index];
            input.disabled = true;  // Optionally disable input after solving
        });
    } else {
        console.log('No solution exists');  // Or handle this case in the UI
        solution_txt.innerText = 'No solution exist!';
    }
}

function solveSudoku(board, row, col) {
    if (row === 9) {
        return true;
    }
    const nextRow = col === 8 ? row + 1 : row;
    const nextCol = col === 8 ? 0 : col + 1;

    if (board[row * 9 + col] !== 0) {
        return solveSudoku(board, nextRow, nextCol);
    }

    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            board[row * 9 + col] = num;
            if (solveSudoku(board, nextRow, nextCol)) {
                return true;
            }
            board[row * 9 + col] = 0;  // Reset on backtrack
        }
    }
    return false;
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        const blockRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const blockCol = 3 * Math.floor(col / 3) + i % 3;
        if (board[row * 9 + i] === num || board[i * 9 + col] === num || board[blockRow * 9 + blockCol] === num) {
            return false;
        }
    }
    return true;
}

function reset() {
    const inputs = document.querySelectorAll('#sudoku-grid input');
    inputs.forEach(input => {
        // Reset only the inputs that do not have the 'system-generated' class
        if (!input.classList.contains('system-generated')) {
            input.value = '';  // Clear the user-entered input
            input.disabled = false;  // Enable the input for editing
            let index = parseInt(input.dataset.index);
            input.style.backgroundColor = determineColor(Math.floor(index / 9), index % 9);
        }
    });
}



function validateInput(input, row, col) {
    const board = [...document.querySelectorAll('#sudoku-grid input')].map(input => input.value ? parseInt(input.value) : 0);
    const num = input.value ? parseInt(input.value) : 0;
    
    // Temporarily set the current cell to 0 to check the validity of the new input
    board[row * 9 + col] = 0;

    if (input.value && !isValid(board, row, col, num)) {
        input.style.backgroundColor = 'red';
    } else {
        input.style.backgroundColor = determineColor(row, col);
    }

    // Restore the current cell value after validation
    board[row * 9 + col] = num;
}



function determineColor(row, col) {
    // Calculate block index
    let blockRow = Math.floor(row / 3);
    let blockCol = Math.floor(col / 3);
    let blockIndex = blockRow * 3 + blockCol;

    // Define which blocks should have the alternate color
    const alternateBlocks = [0, 2, 4, 6, 8];  // Assuming you want to color these blocks

    // Check if the blockIndex is in the alternateBlocks array
    if (alternateBlocks.includes(blockIndex)) {
        return '#adacad';  // Alternate color
    }
    return '#fff';  // Default color
}
