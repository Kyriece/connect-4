let player = 1
let cells;
let totalColumns = 6;
let totalRows = 7;
// Function to create a 7x6 grid
function initializeGrid() {
    const table = document.querySelector("#Grid");
    for (let rowIndex = 0; rowIndex < 7; rowIndex++) {
        let row = table.insertRow();
        for (let columnIndex = 0; columnIndex < 6; columnIndex++) {
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
    cells.forEach((cell, index) => {
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
            bottomCell.dataset.Owner = player;
            bottomCell.innerHTML = `Owner ${bottomCell.dataset.Owner}, Value ${index}`; // Content changes on click
            bottomCell.dataset.isSet = "true"
            // Check if connect 4
            
            console.log(checkWin(row, column));
            console.log(`row: ${row}, col: ${column}`);
            // Change Player
            player = player === 1 ? 2 : 1;
            currentPlayerDisplay();
        });
    });
}

function getBottomCell(cell){
    row = parseInt(cell.dataset.row);
    column = parseInt(cell.dataset.column);
    cellBelow = getCellByRowColumn(row+1, column);
    // Checks if bottom row or cellbelow is taken
    if(row == totalRows-1 || cellBelow.dataset.isSet){
        console.log(`bottom`);
        return cell;
    }
    else{
        console.log(`${cellBelow}`)
        // Gets bottom cell
        console.log(`Row ${row}, Column: ${column}`);
        return getBottomCell(cellBelow);
    }
}

function checkWin(row, column) {
    // Check Row Neighbors
    let checkedCells = []; 
    checkRow(parseInt(row), parseInt(column), checkedCells);
    console.log(`Total Matches ROW: ${checkedCells.length}`);
    if(checkedCells.length >= 4){
        return true;
    }
    // Check diagnols
    checkedCells = [];
    checkDiagonals(row, column, checkedCells);
    console.log(`Total Matches DIAGNOL: ${checkedCells.length}`); 
    if(checkedCells.length >= 4){
        return true;
    }
    // Check Column Neighbors
    checkedCells = [];
    checkVertical(row, column, checkedCells);
    console.log(`Total Matches VERTICAL: ${checkedCells.length}`); 
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

function checkDiagonals(row, column, checkedCells) {
    // Check if the cell is within the grid bounds and not already checked
    if (row < 0 || row >= totalRows || column < 0 || column >= totalColumns || checkedCells.includes(`${row},${column}`)) {
        return;
    }
    let cell = getCellByRowColumn(row, column);
    if (cell && cell.dataset.Owner == player) {
        checkedCells.push(`${row},${column}`);
        // Recursively check both diagonal directions
        checkDiagonals(parseInt(row) - 1, parseInt(column) - 1, checkedCells); // Top-left
        checkDiagonals(parseInt(row) + 1, parseInt(column) + 1, checkedCells); // Bottom-right
        checkDiagonals(parseInt(row) - 1, parseInt(column) + 1, checkedCells); // Top-right
        checkDiagonals(parseInt(row) + 1, parseInt(column) - 1, checkedCells); // Bottom-left
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