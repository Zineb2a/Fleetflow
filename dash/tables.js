let currentDisplayCount = 10000 // Default number of entries to display
let csvdata = []; // To store the CSV data

function loadCSV() {
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/api/v1/user/csv",
        success: function (data) {
            createTable(data);
            updateTableDisplay(); // Update display after table creation
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function parseCSV(text) {
    return text.split('\n').map(line => line.split(','));
}


function createTable(data) {
    const table = document.createElement('table');
    table.setAttribute('data-sort-order', 'asc'); // Initial sort order
    let headerRow = table.insertRow();

    // Adding hardcoded headers
    const headers = ['Booking Date', 'Appointment', 'Vehicle Type'];
    headers.forEach((headerText, index) => {
        let header = document.createElement('th');
        header.textContent = headerText;

        let sortButton = document.createElement('button');
        sortButton.textContent = 'Sort';
        sortButton.className = 'sort-button';
        sortButton.onclick = () => sortTableByColumn(table, index);
        header.appendChild(sortButton);

        headerRow.appendChild(header);
    });

    // Adding data rows
    data.forEach(rowData => {
        let row = table.insertRow();

        // Assuming the first two keys are dates and the last key is the vehicle type
        let keys = Object.keys(rowData);
        if (keys.length === 3) {
            row.insertCell().textContent = keys[0];
            row.insertCell().textContent = rowData[keys[0]];
            row.insertCell().textContent = rowData.compact;
        }
    });

    const container = document.getElementById('tableContainer');
    container.innerHTML = '';
    container.appendChild(table);
}

function sortTableByColumn(table, column) {
    let rows = Array.from(table.getElementsByTagName('tr'));

    // Assuming the table has 3 columns consistently
    const numberOfColumns = 3;

    // Skip the first row (header) and any other non-data rows
    let dataRows = rows.slice(1).filter(row => row.cells.length === numberOfColumns);

    let sortedRows = dataRows.sort((a, b) => {
        let aColText = a.cells[column].textContent.trim();
        let bColText = b.cells[column].textContent.trim();

        if (column < 2) { // Sorting for date columns
            return aColText.localeCompare(bColText);
        } else { // Sorting for the vehicle type column
            return aColText.localeCompare(bColText);
        }
    });

    // Re-append sorted rows to the table
    sortedRows.forEach(row => table.appendChild(row));
}

function updateTableDisplay() {
    const selectedValue = document.getElementById('entriesCount').value;
    currentDisplayCount = selectedValue === 'all' ? 1000 : parseInt(selectedValue, 10);

    const table = document.querySelector('#tableContainer table');
    if (table) {
        const rows = Array.from(table.getElementsByTagName('tr')).slice(1); // Skip the header row
        rows.forEach((row, index) => {
            // Display row if its index is less than currentDisplayCount
            row.style.display = index < currentDisplayCount ? '' : 'none';
        });
    }
}

// Make sure this event listener is added after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('entriesCount').addEventListener('change', updateTableDisplay);
});
onload = loadCSV()