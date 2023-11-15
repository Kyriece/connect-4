let player = 1
let cells;
// Function to create a 7x6 grid
function createGrid() {
    const table = document.getElementById('Grid');
    for (let i = 0; i < 7; i++) {
        let row = table.insertRow();
        for (let j = 0; j < 6; j++) {
            let cell = row.insertCell();
            cell.innerHTML = "Cell"; // Initial content of the cell
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
            player = player === 1 ? 2 : 1;
            currentPlayerDisplay();
        });
    });
}

function currentPlayerDisplay() {
    const playerDisplayElement = document.getElementById("currentPlayer");
    playerDisplayElement.innerHTML = `The current player is: ${player}`;
}

// Initialize the grid and setup event listeners when the window loads
window.onload = function() {
    createGrid();
    assignValues();
};