let player = 1
let cells;
let totalColumns = 7;
let totalRows = 6;
// Function to create a 7x6 grid
function initializeGrid() {
    const table = document.querySelector("#Grid");
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
        let row = table.insertRow();
        for (let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
            let cell = row.insertCell();
            cell.dataset.row = rowIndex;       // Set row index
            cell.dataset.column = columnIndex; // Set column index
            // Initialize the cell with some default content if necessary

        }
    }
}

// Function to assign values to cells on click
function assignValues() {
    cells = document.querySelectorAll("#Grid td")
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            // Checks if cell is taken
            if(cell.dataset.isSet){
                return;
            }
            row = cell.dataset.row;
            column = cell.dataset.column;
            // Gets bottom cell
            bottomCell = getBottomCell(cell);
            // Assigns owner and increments player
            setCellForPlayer(bottomCell)
            // Check if connect 4      
            if(checkWin(row, column)){
                endGame();
            }
            else{
                player = player === 1 ? 2 : 1;
            }
            // Change Player
            currentPlayerDisplay();
        });
    });
}

function setCellForPlayer(cell){
    let playerClass = (player === 1) ? 'disc-player1' : 'disc-player2';
    let discDiv = document.createElement('div');
    discDiv.className = `disc ${playerClass}`; // Apply disc class for animation
    bottomCell.appendChild(discDiv);
    cell.dataset.Owner = player;
    // cell.innerHTML = `<div class="${playerClass}"></div>`; // Content changes on click
    cell.dataset.isSet = "true"
}

function getBottomCell(cell){
    row = parseInt(cell.dataset.row);
    column = parseInt(cell.dataset.column);
    cellBelow = getCellByRowColumn(row+1, column);
    // Checks if bottom row or cellbelow is taken
    if(row == totalRows-1 || cellBelow.dataset.isSet){
        return cell;
    }
    else{
        return getBottomCell(cellBelow);
    }
}

function endGame(){
    setTimeout(function() {
        const grid = document.querySelector("#Grid");
        grid.innerHTML = ''; // This clears the content of the grid
        alert(`Player ${player} wins! Starting new game.`);
        initializeGrid();
        player = player === 1 ? 2 : 1;
        currentPlayerDisplay();
        assignValues();
    }, 50); // Delay of 500 milliseconds (0.5 seconds)
}

function checkWin(row, column) {
    // Check Row Neighbors
    let checkedCells = []; 
    checkRow(parseInt(row), parseInt(column), checkedCells);
    if(checkedCells.length >= 4){
        return true;
    }
    // Check diagnols
    checkedCells = [];
    checkDiagonalsTLBR(row, column, checkedCells);
    if(checkedCells.length >= 4){
        return true;
    }
    checkDiagonalsBLTR(row, column, checkedCells);
    if(checkedCells.length >= 4){
        return true;
    }
    // Check Column Neighbors
    checkedCells = [];
    checkVertical(row, column, checkedCells);
    if(checkedCells.length >= 4){
        return true;
    }
    return false;
    // Additional checks (diagonal, column, etc.) can be added here
}

function checkRow(row, column, checkedCells) {
    // Check if the column is within the grid bounds and not already checked
    if (column < 0 || column >= totalColumns || checkedCells.includes(column)) {
        return;
    }
    let cell = getCellByRowColumn(row, column);
    if (cell && cell.dataset.Owner == player) {
        checkedCells.push(column); // Mark this column as checked
        // Recursively check left and right neighbors
        checkRow(parseInt(row), parseInt(column) - 1, checkedCells, totalColumns);
        checkRow(parseInt(row), parseInt(column) + 1, checkedCells, totalColumns);
    }
}

function checkDiagonalsTLBR(row, column, checkedCells) {
    // Check if the cell is within the grid bounds and not already checked
    if (row < 0 || row >= totalRows || column < 0 || column >= totalColumns || checkedCells.includes(`${row},${column}`)) {
        return;
    }
    let cell = getCellByRowColumn(row, column);
    if (cell && cell.dataset.Owner == player) {
        checkedCells.push(`${row},${column}`);
        // Recursively check both diagonal directions
        checkDiagonalsTLBR(parseInt(row) - 1, parseInt(column) - 1, checkedCells); // Top-left
        checkDiagonalsTLBR(parseInt(row) + 1, parseInt(column) + 1, checkedCells); // Bottom-right
    }
}

function checkDiagonalsBLTR(row, column, checkedCells) {
    // Check if the cell is within the grid bounds and not already checked
    if (row < 0 || row >= totalRows || column < 0 || column >= totalColumns || checkedCells.includes(`${row},${column}`)) {
        return;
    }
    let cell = getCellByRowColumn(row, column);
    if (cell && cell.dataset.Owner == player) {
        checkedCells.push(`${row},${column}`);
        // Recursively check both diagonal directions
        checkDiagonalsBLTR(parseInt(row) - 1, parseInt(column) + 1, checkedCells); // Top-right
        checkDiagonalsBLTR(parseInt(row) + 1, parseInt(column) - 1, checkedCells); // Bottom-left
    }
}

function checkVertical(row, column, checkedCells) {
    // Check if the cell is within the grid bounds and not already checked
    if (row < 0 || row >= totalRows || checkedCells.includes(`${row},${column}`)) {
        return;
    }
    let cell = getCellByRowColumn(row, column);
    if (cell && cell.dataset.Owner == player) {
        checkedCells.push(`${row},${column}`);
        // Recursively check up and down
        checkVertical(parseInt(row) - 1, column, checkedCells); // Up
        checkVertical(parseInt(row) + 1, column, checkedCells); // Down
    }
}

function getCellByRowColumn(row, column) {
    for (let cell of cells) {
        if (parseInt(cell.dataset.row) == row && parseInt(cell.dataset.column) == column) {
            return cell;
        }
    }
    return null; // Return null if no cell matches the criteria
}

function currentPlayerDisplay() {
    const playerDisplayElement = document.getElementById("currentPlayer");
    playerDisplayElement.innerHTML = `The current player is: ${player}`;
}

// Initialize the grid and setup event listeners when the window loads
window.onload = function() {
    initializeGrid();
    assignValues();
};