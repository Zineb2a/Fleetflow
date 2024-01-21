// Set new data for the chart
var totalRevenue = 90000;  // The total potential revenue
var revenueEarned = 65000;  // The actual revenue earned
var revenueLost = totalRevenue - revenueEarned;  // The revenue lost

// This will render the donut chart with earned and lost revenue
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Revenue Earned", "Revenue Lost"],
        datasets: [{
            data: [revenueEarned, revenueLost],
            backgroundColor: ['#4e73df', '#e74a3b'],
            hoverBackgroundColor: ['#2e59d9', '#be2617'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
    },
    options: {
        maintainAspectRatio: false,
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
            callbacks: {
                label: function(tooltipItem, chart) {
                    var dataset = chart.datasets[tooltipItem.datasetIndex];
                    var total = dataset.data.reduce(function(previousValue, currentValue) {
                        return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
                    return percentage + "%";
                }
            }
        },
        legend: {
            display: true
        },
        cutoutPercentage: 80,
    },
});
