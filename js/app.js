// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.setAttribute('data-theme', 
        document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    themeToggle.innerHTML = document.body.getAttribute('data-theme') === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', document.body.getAttribute('data-theme'));
});

// Initialize theme from localStorage
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Chart Initialization
function initCharts() {
    // Heart Rate Chart
    new Chart(document.getElementById('hrChart'), {
        type: 'line',
        data: {
            labels: Array.from({length: 24}, (_, i) => `${i}:00`),
            datasets: [{
                label: 'BPM',
                data: Array.from({length: 24}, () => Math.floor(60 + Math.random() * 30)),
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                x: { display: false },
                y: { display: false }
            }
        }
    });

    // Blood Pressure Chart
    new Chart(document.getElementById('bpChart'), {
        type: 'line',
        data: {
            labels: Array.from({length: 24}, (_, i) => `${i}:00`),
            datasets: [{
                label: 'Systolic',
                data: Array.from({length: 24}, () => Math.floor(100 + Math.random() * 40)),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                x: { display: false },
                y: { display: false }
            }
        }
    });

    // Oxygen Chart
    new Chart(document.getElementById('oxChart'), {
        type: 'line',
        data: {
            labels: Array.from({length: 24}, (_, i) => `${i}:00`),
            datasets: [{
                label: 'SpO2',
                data: Array.from({length: 24}, () => Math.floor(95 + Math.random() * 3)),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                x: { display: false },
                y: { display: false }
            }
        }
    });

    // Activity Chart
    new Chart(document.getElementById('activityChart'), {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Steps',
                data: Array.from({length: 7}, () => Math.floor(3000 + Math.random() * 8000)),
                backgroundColor: '#4f46e5',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                x: { grid: { display: false } },
                y: { grid: { display: false }, display: false }
            }
        }
    });

    // ECG Simulation
    const ecgCtx = document.getElementById('ecgChart').getContext('2d');
    const ecgChart = new Chart(ecgCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: 100}, (_, i) => i),
            datasets: [{
                data: Array(100).fill(0),
                borderColor: '#ef4444',
                borderWidth: 2,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 0 },
            plugins: { legend: { display: false } },
            scales: { 
                x: { display: false },
                y: { display: false }
            }
        }
    });

    // Simulate ECG in real-time
    let ecgData = Array(100).fill(0);
    let ecgCounter = 0;
    
    function simulateEcg() {
        ecgCounter++;
        
        // Generate ECG-like pattern
        const position = ecgCounter % 100;
        let value = 0;
        
        if (position === 25 || position === 75) {
            value = 100; // QRS complex
        } else if (position > 25 && position < 30) {
            value = -20; // S wave
        } else if (position > 75 && position < 80) {
            value = -15; // T wave
        }
        
        ecgData.shift();
        ecgData.push(value);
        ecgChart.data.datasets[0].data = ecgData;
        ecgChart.update();
    }
    
    let ecgInterval = setInterval(simulateEcg, 50);
    
    // ECG Controls
    document.querySelector('.btn-play').addEventListener('click', () => {
        if (!ecgInterval) {
            ecgInterval = setInterval(simulateEcg, 50);
        }
    });
    
    document.querySelector('.btn-pause').addEventListener('click', () => {
        clearInterval(ecgInterval);
        ecgInterval = null;
    });
}

// Initialize all charts when DOM is loaded
document.addEventListener('DOMContentLoaded', initCharts);

// Refresh alerts
document.querySelector('.btn-refresh').addEventListener('click', () => {
    const alertItems = document.querySelectorAll('.alert-item');
    alertItems.forEach(item => {
        item.style.opacity = '0';
        setTimeout(() => {
            item.style.opacity = '1';
        }, 300);
    });
});

// app.js - Patients Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // View Toggle
    const viewBtns = document.querySelectorAll('.view-btn');
    const listView = document.getElementById('listView');
    const gridView = document.getElementById('gridView');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.view === 'list') {
                listView.classList.remove('hidden');
                gridView.classList.add('hidden');
            } else {
                listView.classList.add('hidden');
                gridView.classList.remove('hidden');
            }
        });
    });
    
    // New Patient Modal
    const addPatientBtn = document.querySelector('.btn-add-patient');
    const patientModal = document.getElementById('patientModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.btn-cancel');
    
    function toggleModal() {
        patientModal.classList.toggle('active');
    }
    
    addPatientBtn.addEventListener('click', toggleModal);
    closeModalBtn.addEventListener('click', toggleModal);
    cancelBtn.addEventListener('click', toggleModal);
    
    // Close modal when clicking outside
    patientModal.addEventListener('click', function(e) {
        if (e.target === patientModal) {
            toggleModal();
        }
    });
    
    // Form submission
    const patientForm = document.getElementById('patientForm');
    patientForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, you would handle form submission here
        alert('Patient added successfully!');
        toggleModal();
        patientForm.reset();
    });
    
    // Initialize other functionality (from previous pages)
    initThemeToggle();
    initNotifications();
});

// Shared Functions
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        document.body.setAttribute('data-theme', 
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        );
        localStorage.setItem('theme', document.body.getAttribute('data-theme'));
    });
}

function initNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    if (!notificationBtn) return;
    
    notificationBtn.addEventListener('click', function() {
        // In a real app, you would show notifications dropdown
        console.log('Show notifications');
    });
}