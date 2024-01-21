let currentDisplayCount = 50; // Default number of entries to display
let data = []; // To store the CSV data

function loadCSV(event) {
    const input = event.target;
    if ('files' in input && input.files.length > 0) {
        readFileContent(input.files[0])
            .then(content => {
                data = parseCSV(content);
                createTable(data);
                updateTableDisplay(); // Update display after table creation
            })
            .catch(error => console.log(error));
    }
}

function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
    });
}

function parseCSV(text) {
    return text.split('\n').map(line => line.split(','));
}

function createTable(data) {
    const table = document.createElement('table');
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
        rowData.forEach(cellData => {
            let cell = row.insertCell();
            cell.textContent = cellData;
        });
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
    currentDisplayCount = selectedValue === 'all' ? data.length : parseInt(selectedValue, 10);

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
    document.getElementById('csvFileInput').addEventListener('change', loadCSV);
    document.getElementById('entriesCount').addEventListener('change', updateTableDisplay);
});
