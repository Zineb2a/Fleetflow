// Function to read the CSV file
function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
    });
}

// Function to parse CSV content
function parseCSV(text) {
    const lines = text.split('\n').map(line => line.split(',').map(cell => cell.trim()));
    lines.sort((a, b) => new Date(a[1]) - new Date(b[1]));
    return lines;
}

// Function to allocate bays and schedule appointments
function scheduleAppointments(data) {
    const serviceTime = {
        'compact': 30,
        'medium': 30,
        'full-size': 30,
        'class 1 truck': 60,
        'class 2 truck': 120
    };

    const serviceCharge = {
        'compact': 150,
        'medium': 150,
        'full-size': 150,
        'class 1 truck': 250,
        'class 2 truck': 700
    };

    const bayStatus = new Array(10).fill(null);

    function findAvailableBay(appointmentTime) {
        for (let i = 0; i < bayStatus.length; i++) {
            if (!bayStatus[i] || bayStatus[i].endTime <= appointmentTime) {
                return i;
            }
        }
        return -1;
    }

    const scheduledAppointments = [];

    data.sort((a, b) => {
        const timeDiff = new Date(a[1]) - new Date(b[1]);
        if (timeDiff !== 0) return timeDiff;
        return serviceCharge[b[2].toLowerCase()] - serviceCharge[a[2].toLowerCase()];
    });

    data.forEach((appointment, index) => {
        if (index === 0 || appointment.length < 3) return;

        const requestTime = new Date(appointment[1]);
        const vehicleType = appointment[2].toLowerCase();
        const endTime = new Date(requestTime.getTime() + serviceTime[vehicleType] * 60000);
        const closingTime = new Date(requestTime);
        closingTime.setHours(19, 0, 0, 0);

        if (endTime > closingTime) {
            scheduledAppointments.push([...appointment, 'Turned Away']);
            return;
        }

        const bayIndex = findAvailableBay(requestTime);

        if (bayIndex !== -1) {
            bayStatus[bayIndex] = { endTime: endTime };
            scheduledAppointments.push([...appointment, `Bay ${bayIndex + 1}`]);
        } else {
            if (!bayStatus.some(status => !status || status.endTime <= requestTime)) {
                scheduledAppointments.push([...appointment, 'Turned Away']);
            } else {
                const nextAvailableBayIndex = findAvailableBay(requestTime);
                if (nextAvailableBayIndex !== -1) {
                    bayStatus[nextAvailableBayIndex] = { endTime: endTime };
                    scheduledAppointments.push([...appointment, `Bay ${nextAvailableBayIndex + 1}`]);
                } else {
                    scheduledAppointments.push([...appointment, 'Turned Away']);
                }
            }
        }
    });

    return scheduledAppointments;
}

// Function to create a table and display the scheduled appointments
function createTable(data) {
    const table = document.createElement('table');
    let row = table.insertRow();
    ['Appointment Date', 'Car Type', 'Allocated Bay'].forEach(headerText => {
        let header = document.createElement('th');
        header.textContent = headerText;
        row.appendChild(header);
    });

    data.forEach((rowData, index) => {
        if (index === 0 || rowData.length < 4 || rowData[3] === 'Turned Away') return; // Skip header row, malformed data, and 'Turned Away' rows

        let row = table.insertRow();
        [rowData[1], rowData[2], rowData[3]].forEach(cellData => { // Display only columns 2, 3, and 4
            let cell = row.insertCell();
            cell.textContent = cellData;
        });
    });

    const container = document.getElementById('tableContainer');
    container.innerHTML = '';
    container.appendChild(table);
}

// Main function to load and process the CSV file
function loadCSV(event) {
    const input = event.target;
    if ('files' in input && input.files.length > 0) {
        readFileContent(input.files[0])
            .then(content => {
                const data = parseCSV(content);
                const scheduledData = scheduleAppointments(data);

                $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay,listWeek'
                    },
                    validRange: {
                        start: '2022-10-01',
                        end: '2022-11-30'
                    },
                    events:scheduledData
                    .filter(event => event[3] !== 'Turned Away')
                    .map(event => ({
                        title: `${event[2]}(${event[3]})`,
                        start: new Date(event[1]),
                        end: new Date(event[1]),
                        vehiculeType: event[2],
                        bayStatus: event[3]
                    })),
                    timeFormat: 'h:mm a',
                    eventRender: function (event, element) {
                        element.attr('title', event.description);
                    }
                });

                createTable(scheduledData);
            })
            .catch(error => console.log(error));
    }
}

document.getElementById('fileInput').addEventListener('change', loadCSV);
