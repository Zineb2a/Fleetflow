<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
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
        events:function(info, successCallback, failureCallback) {
            // Fetch and parse the CSV file
            Papa.parse('datafile.csv', {
                download: true,
                header: true,
                complete: function(results) {
                    // Process the parsed CSV data
                    var events = results.data.map(function(event) {
                        return {
                            title: event.title,
                            start: event.start,
                            end: event.end
                            // Add more properties as needed
                        };
                    });

                    // Call the successCallback with the parsed events
                    successCallback(events);
                },
                error: function(error) {
                    // Call the failureCallback in case of an error
                    failureCallback(error);
                }
            });
        },
        timeFormat: 'h:mm a',
        eventRender: function(event, element) {
            element.attr('title', event.description);
        }
    });
    $('#compactCarsNb').text(compactCarsNb.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    $('#mediumCarsNb').text(mediumCarsNb.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    $('#fullSizeCarsNb').text(fullSizeCarsNb.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    $('#class1TrucksNb').text(class1TrucksNb.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    $('#class2TrucksNb').text(class2TrucksNb.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));

});
