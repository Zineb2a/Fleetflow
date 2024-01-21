// Custom JavaScript logic goes here
$(document).ready(function() {
    // Initialize FullCalendar
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek' // Include listWeek for weekly list view
        },
        validRange: {
            start: '2022-10-01',
            end: '2022-11-30'
        },
        events: [
            {
                // Your events data here
            },
            {
                // Your events data here
            }
            // Add more events with date and time
        ],
        timeFormat: 'h:mm a',
        eventRender: function(event, element) {
            element.attr('title', event.description);
        }
    });
});
