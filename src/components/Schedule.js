let csvData = []; // Global variable to store CSV data

function loadCSV(event) {
    // ... existing code ...
}

function createTable(data) {
    // ... existing code ...
}

function applyFilter() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const carType = document.getElementById('carType').value.toLowerCase();

    const filteredData = csvData.filter(row => {
        const rowDate = new Date(row[1]); // Assuming the second column is the date
        const isDateInRange = (!startDate || new Date(startDate) <= rowDate) &&
                               (!endDate || new Date(endDate) >= rowDate);
        const isCarTypeMatch = !carType || row[2].toLowerCase().includes(carType); // Assuming the third column is the car type
        return isDateInRange && isCarTypeMatch;
    });

    createTable(filteredData);
}

function parseCSV(text) {
    // ... existing code ...
    csvData = lines; // Store the parsed data globally
}

function loadCSV(event) {
    const input = event.target;
    if ('files' in input && input.files.length > 0) {
        readFileContent(input.files[0])
            .then(content => {
                const data = parseCSV(content);
                createTable(data);
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
    const lines = text.split('\n').map(line => line.split(','));
    return lines; // Returns an array of arrays (each array is a row)
}
function createTable(data) {
    const table = document.createElement('table');
    // Add Bootstrap table classes
    table.className = 'table table-striped table-bordered table-hover';

    // Create header row
    let header = table.createTHead();
    let headerRow = header.insertRow();
    ['Date of Submission', 'Appointment Date', 'Car Type'].forEach(headerText => {
        let th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // Create and populate the body of the table
    let tbody = table.createTBody();
    data.forEach((rowData, index) => {
        if (index === 0) return; // Skip header if it's included in CSV
        let row = tbody.insertRow();
        rowData.forEach(cellData => {
            let cell = row.insertCell();
            cell.textContent = cellData;
        });
    });

    // Add the table to the container
    const container = document.getElementById('tableContainer');
    container.innerHTML = ''; // Clear any existing content
    container.appendChild(table);
}
function loadCSVFromServer() {
    fetch('D:/Hackathon/Frontend/datafile.csv') // Update this path to the actual path of your CSV file on the server
        .then(response => response.text())
        .then(content => {
            // Assuming the parseCSV function is already defined
            const data = parseCSV(content);
            createTable(data);
        })
        .catch(error => console.error('Error fetching the CSV:', error));
}

// Call this function when the page loads
window.onload = loadCSVFromServer;