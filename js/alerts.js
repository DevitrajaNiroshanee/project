document.addEventListener('DOMContentLoaded', function() {
    // Initialize alert trend chart
    initAlertTrendChart();
    
    // Filter functionality
    document.getElementById('priorityFilter').addEventListener('change', filterAlerts);
    document.getElementById('timeFilter').addEventListener('change', filterAlerts);
    
    // Refresh button
    document.querySelector('.btn-refresh').addEventListener('click', function() {
        // In a real app, this would fetch new alerts
        console.log('Refreshing alerts...');
        showNotification('Alerts refreshed');
    });
    
    // Mark all as read
    document.querySelector('.btn-mark-all').addEventListener('click', function() {
        document.querySelectorAll('.alert-item.unread').forEach(alert => {
            alert.classList.remove('unread');
        });
        showNotification('All alerts marked as read');
    });
    
    // Alert action handlers
    document.querySelectorAll('.acknowledge, .snooze, .dismiss').forEach(btn => {
        btn.addEventListener('click', function() {
            const alertItem = this.closest('.alert-item');
            const action = this.classList.contains('acknowledge') ? 'acknowledged' : 
                          this.classList.contains('snooze') ? 'snoozed' : 'dismissed';
            
            alertItem.classList.add('resolved');
            alertItem.querySelector('.alert-actions').innerHTML = `
                <button class="btn-action view-notes">
                    <i class="fas fa-file-medical"></i> View Notes
                </button>
            `;
            
            showNotification(`Alert ${action} successfully`);
        });
    });
    
    // View patient/notes buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.view-patient')) {
            // In a real app, this would open patient record
            console.log('Viewing patient record');
        }
        
        if (e.target.closest('.view-notes')) {
            // In a real app, this would open clinical notes
            console.log('Viewing clinical notes');
        }
    });
});

function filterAlerts() {
    const priority = document.getElementById('priorityFilter').value;
    const timeRange = document.getElementById('timeFilter').value;
    
    // In a real app, this would filter alerts from server
    console.log(`Filtering alerts by: Priority=${priority}, Time=${timeRange}`);
    
    // Demo: Hide/show alerts based on priority filter
    document.querySelectorAll('.alert-item').forEach(alert => {
        const matchesPriority = priority === 'all' || alert.classList.contains(priority);
        alert.style.display = matchesPriority ? 'flex' : 'none';
    });
}

function initAlertTrendChart() {
    new Chart(document.getElementById('alertTrendChart'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Critical Alerts',
                    data: [12, 8, 15, 10, 7, 4, 2],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Warning Alerts',
                    data: [20, 15, 18, 22, 14, 10, 5],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

function showNotification(message) {
    // In a real app, you'd use a proper notification system
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }, 100);
}