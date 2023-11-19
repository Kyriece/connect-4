let player = 1
let cells;
let totalColumns = 6;
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
            cell.innerHTML = "Empty"; 
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
            // Assigns owner and increments player
            cell.dataset.Owner = player;
            cell.innerHTML = `Owner ${cell.dataset.Owner}, Value ${index}`; // Content changes on click
            cell.dataset.isSet = "true"
            // Check if connect 4
            row = cell.dataset.row;
            column = cell.dataset.column;
            checkWin(row, column);
            // Change Player
            player = player === 1 ? 2 : 1;
            currentPlayerDisplay();
        });
    });
}

function checkWin(row, column) {
    let columnChecked = []; 
    // Check Row Neighbors
    checkRow(parseInt(row), parseInt(column), columnChecked);

    console.log(`Total Matches: ${columnChecked.length}`); // Log the number of matching neighbors

    // Additional checks (diagonal, column, etc.) can be added here
}



function checkRow(row, column, columnChecked) {
    // Check if the column is within the grid bounds and not already checked
    if (column < 0 || column >= totalColumns || columnChecked.includes(column)) {
        return;
    }

    let cell = getCellByRowColumn(row, column);
    if (cell && cell.dataset.Owner == player) {
        columnChecked.push(column); // Mark this column as checked
        // Recursively check left and right neighbors
        checkRow(parseInt(row), parseInt(column) - 1, columnChecked, totalColumns);
        checkRow(parseInt(row), parseInt(column) + 1, columnChecked, totalColumns);
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

function checkColumn(column){

}

function checkDiagonal(row, column){

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