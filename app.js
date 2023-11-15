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
    const cells = document.querySelectorAll("#Grid td");
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            cell.innerHTML = `Value ${index}`; // Content changes on click
        });
    });
}

// Initialize the grid and setup event listeners when the window loads
window.onload = function() {
    createGrid();
    assignValues();
};