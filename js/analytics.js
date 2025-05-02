document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initMetricsCharts();
    initMainCharts();
    
    // Time filter functionality
    const timeBtns = document.querySelectorAll('.time-btn');
    timeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            timeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // In a real app, you would reload data for the selected time period
            console.log(`Time period selected: ${this.textContent}`);
        });
    });
    
    // Export button
    document.querySelector('.export-btn').addEventListener('click', function() {
        // In a real app, this would trigger data export
        alert('Exporting analytics data...');
    });
});

function initMetricsCharts() {
    // Mini charts for metric cards
    new Chart(document.getElementById('patientsChart'), {
        type: 'line',
        data: {
            labels: Array.from({length: 7}, (_, i) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]),
            datasets: [{
                data: [120, 125, 130, 128, 135, 140, 142],
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            elements: {
                point: { radius: 0 }
            }
        }
    });
    
    // Similar initialization for hrChart and alertsChart...
}

function initMainCharts() {
    // Health Trends Chart
    new Chart(document.getElementById('trendsChart'), {
        type: 'line',
        data: {
            labels: Array.from({length: 24}, (_, i) => `${i}:00`),
            datasets: [
                {
                    label: 'Heart Rate',
                    data: Array.from({length: 24}, () => 60 + Math.random() * 30),
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Blood Pressure (Sys)',
                    data: Array.from({length: 24}, () => 100 + Math.random() * 40),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Oxygen Saturation',
                    data: Array.from({length: 24}, () => 90 + Math.random() * 8),
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: getChartOptions('Health Metrics Over Time')
    });
    
    // Patient Demographics Chart
    new Chart(document.getElementById('demographicsChart'), {
        type: 'doughnut',
        data: {
            labels: ['18-30', '31-45', '46-60', '61+'],
            datasets: [{
                data: [25, 40, 50, 27],
                backgroundColor: [
                    '#4f46e5',
                    '#6366f1',
                    '#818cf8',
                    '#a5b4fc'
                ],
                borderWidth: 0
            }]
        },
        options: getChartOptions('Age Distribution', true)
    });
    
    // Other charts initialization...
}

function getChartOptions(title, showLegend = false) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                display: showLegend
            },
            title: {
                display: !!title,
                text: title,
                font: {
                    size: 16
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            }
        }
    };
}