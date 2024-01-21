let compactCarsNb = 10000;
let mediumCarsNb = 20000;
let fullSizeCarsNb = 22000;
let class1TrucksNb = 1000;
let class2TrucksNb = 1500;

$(document).ready(function() {
    // Initialize FullCalendar
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
        events: function(info, successCallback, failureCallback) {
            // Fetch and parse the CSV file
            console.log('Fetching and parsing CSV file...');
            fetch('http://localhost:3000/api/events') /** TO MODIFY */
            .then(response => response.json())
            .then(events => {
                // Map the fetched data to the required format
                const mappedEvents = events.map(event => ({
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    vehiculeType: event.vehiculeType
                }));

                // Call the successCallback with the fetched events
                successCallback(mappedEvents);
            })
            .catch(error => {
                // Call the failureCallback in case of an error
                console.error('Error fetching events:', error);
                failureCallback(error);
            });
            
        },
        timeFormat: 'h:mm a',
        eventRender: function(event, element) {
            element.attr('title', event.description);
        }

    });
    $('#calendar').fullCalendar('render');
    $('#compactCarsNb').text(compactCarsNb.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    $('#mediumCarsNb').text(mediumCarsNb.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    $('#fullSizeCarsNb').text(fullSizeCarsNb.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    $('#class1TrucksNb').text(class1TrucksNb.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    $('#class2TrucksNb').text(class2TrucksNb.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));

});
