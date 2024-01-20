// Function to parse the CSV data
function parseCSV(csvData) {
    const lines = csvData.split('\n');
    return lines.map(line => {
        const [requestTimestamp, appointmentTimestamp, vehicleType] = line.split(',');
        return { requestTimestamp, appointmentTimestamp, vehicleType };
    });
}

// Helper function to check if a spot is occupied
function isSpotOccupied(appointment, currentTime, vehicleType) {
    // Parse the appointment timestamp
    const appointmentTime = new Date(appointment.appointmentTimestamp);
    const duration = getDurationForVehicleType(appointment.vehicleType);

    // Check if the current time falls within the appointment duration
    return appointment.vehicleType === vehicleType &&
           appointmentTime <= currentTime && 
           new Date(appointmentTime.getTime() + duration) > currentTime;
}

// Get duration in milliseconds based on vehicle type
function getDurationForVehicleType(vehicleType) {
    switch (vehicleType.trim().toLowerCase()) {
        case 'compact':
            return 30 * 60 * 1000; // 30 minutes in milliseconds
        case 'medium':
            return 30 * 60 * 1000; // 30 minutes in milliseconds
        case 'full-size':
            return 30 * 60 * 1000; // 30 minutes in milliseconds
        case 'class 1 truck':
            return 60 * 60 * 1000; // 1 hour in milliseconds
        case 'class 2 truck':
            return 2 * 60 * 60 * 1000; // 2 hours in milliseconds
        default:
            return 0;
    }
}

// Function to update the status of the spots
function updateSpotStatus(appointments) {
    const currentTime = new Date(); // Assuming we're checking for the current time
    const vehicleTypes = ['compact', 'medium', 'full-size', 'class 1 truck', 'class 2 truck', 'open'];

    vehicleTypes.forEach(vehicleType => {
        const spots = document.querySelectorAll(`.vehicle-section[data-vehicle-type="${vehicleType}"]`);
        spots.forEach(spot => {
            const icon = spot.querySelector('i'); // Select the icon within the spot
            const occupied = appointments.some(appointment => 
                isSpotOccupied(appointment, currentTime, vehicleType)
            );
            spot.setAttribute('data-status', occupied ? 'occupied' : 'available');
            icon.style.color = occupied ? 'red' : '#2ecc71'; // Update the icon color based on the occupancy
        });
    });
}


// Function to read the CSV file
function readCSVFile(filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(csvData => {
            const appointments = parseCSV(csvData);
            updateSpotStatus(appointments);
        })
        .catch(error => console.error('Error reading CSV file:', error));
}

// Start the process
document.addEventListener('DOMContentLoaded', function() {
    readCSVFile('datafile.csv');
});
