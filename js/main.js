// main.js - Unified Application Script

document.addEventListener('DOMContentLoaded', () => {
    // -------------------- PWA Loader --------------------
    const pwaLoader = document.getElementById('pwaLoader');
    setTimeout(() => {
        if (pwaLoader) {
            pwaLoader.style.opacity = '0';
            setTimeout(() => {
                pwaLoader.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // -------------------- Theme Toggle --------------------
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', theme);
    }

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    // -------------------- Mobile Navigation --------------------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // -------------------- Smooth Scroll --------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                if (navToggle && navMenu) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // -------------------- Dynamic Features --------------------
    const featuresGrid = document.querySelector('.features-grid');
    if (featuresGrid) {
        const features = [
            { icon: 'fas fa-heartbeat', title: 'Real-time Monitoring', description: 'Continuous tracking of vital signs with AI-powered anomaly detection' },
            { icon: 'fas fa-chart-line', title: 'Predictive Analytics', description: 'Machine learning models predict potential health issues before they occur' },
            { icon: 'fas fa-bell', title: 'Smart Alerts', description: 'Configurable alerts for critical health parameter thresholds' },
            { icon: 'fas fa-mobile-alt', title: 'Mobile Integration', description: 'Seamless connection with wearable devices and health apps' },
            { icon: 'fas fa-shield-alt', title: 'HIPAA Compliance', description: 'Enterprise-grade security and privacy protections' },
            { icon: 'fas fa-plug', title: 'API First', description: 'RESTful API for easy integration with existing health systems' }
        ];

        features.forEach(feature => {
            const featureElement = document.createElement('div');
            featureElement.className = 'feature-item';
            featureElement.innerHTML = `
                <div class="feature-icon">
                    <i class="${feature.icon}"></i>
                </div>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            `;
            featuresGrid.appendChild(featureElement);
        });
    }

    // -------------------- Intersection Observer --------------------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.section, .feature-item').forEach(section => {
        observer.observe(section);
    });

    // -------------------- Health Dashboard --------------------
    class HealthDashboard {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            this.init();
        }

        init() {
            if (!this.container) return;

            this.container.innerHTML = `
                <div class="dashboard-header">
                    <h3>Patient Health Dashboard</h3>
                    <div class="dashboard-controls">
                        <select id="timeRange">
                            <option value="24h">Last 24 Hours</option>
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                        </select>
                    </div>
                </div>
                <div class="dashboard-metrics">
                    <div class="metric-card" id="heartRate">
                        <h4>Heart Rate</h4>
                        <div class="metric-value">72 <small>bpm</small></div>
                        <div class="metric-chart" id="hrChart"></div>
                    </div>
                    <div class="metric-card" id="bloodPressure">
                        <h4>Blood Pressure</h4>
                        <div class="metric-value">120/80 <small>mmHg</small></div>
                        <div class="metric-chart" id="bpChart"></div>
                    </div>
                    <div class="metric-card" id="oxygen">
                        <h4>Oxygen Saturation</h4>
                        <div class="metric-value">98 <small>%</small></div>
                        <div class="metric-chart" id="oxChart"></div>
                    </div>
                    <div class="metric-card" id="activity">
                        <h4>Activity</h4>
                        <div class="metric-value">8,542 <small>steps</small></div>
                        <div class="metric-chart" id="actChart"></div>
                    </div>
                </div>
                <div class="dashboard-alerts">
                    <h4>Recent Alerts</h4>
                    <div class="alerts-list" id="alertsList"></div>
                </div>
            `;

            this.simulateData();
            const timeRange = document.getElementById('timeRange');
            if (timeRange) {
                timeRange.addEventListener('change', () => this.simulateData());
            }
        }

        simulateData() {
            const metrics = ['heartRate', 'bloodPressure', 'oxygen', 'activity'];
            metrics.forEach(metric => {
                const valueEl = document.querySelector(`#${metric} .metric-value`);
                if (!valueEl) return;

                switch (metric) {
                    case 'heartRate':
                        valueEl.innerHTML = `${Math.floor(60 + Math.random() * 30)} <small>bpm</small>`;
                        break;
                    case 'bloodPressure':
                        const sys = Math.floor(110 + Math.random() * 30);
                        const dia = Math.floor(70 + Math.random() * 15);
                        valueEl.innerHTML = `${sys}/${dia} <small>mmHg</small>`;
                        break;
                    case 'oxygen':
                        valueEl.innerHTML = `${Math.floor(95 + Math.random() * 3)} <small>%</small>`;
                        break;
                    case 'activity':
                        valueEl.innerHTML = `${Math.floor(5000 + Math.random() * 7000).toLocaleString()} <small>steps</small>`;
                        break;
                }
            });

            const alerts = [
                { type: 'warning', message: 'Elevated heart rate detected at 2:45 PM', time: '10 min ago' },
                { type: 'info', message: 'Daily activity goal achieved', time: '2 hours ago' },
                { type: 'normal', message: 'Regular checkup reminder', time: 'Yesterday' }
            ];

            const alertsList = document.getElementById('alertsList');
            if (alertsList) {
                alertsList.innerHTML = alerts.map(alert => `
                    <div class="alert-item ${alert.type}">
                        <i class="fas fa-${alert.type === 'warning' ? 'exclamation-triangle' : alert.type === 'info' ? 'info-circle' : 'check-circle'}"></i>
                        <div class="alert-content">
                            <p>${alert.message}</p>
                            <small>${alert.time}</small>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    const demoSection = document.querySelector('.section-demo');
    if (demoSection) {
        const demoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !window.healthDashboard) {
                    window.healthDashboard = new HealthDashboard('demoFrame');
                    initCharts();
                }
            });
        }, { threshold: 0.1 });

        demoObserver.observe(demoSection);
    }

    // -------------------- Alert Refresh --------------------
    const refreshBtn = document.querySelector('.btn-refresh');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            document.querySelectorAll('.alert-item').forEach(item => {
                item.style.opacity = '0';
                setTimeout(() => item.style.opacity = '1', 300);
            });
        });
    }
});

// -------------------- Chart Initialization --------------------
function initCharts() {
    if (typeof Chart === 'undefined') return;

    const lineChart = (id, data, color) => {
        const el = document.getElementById(id);
        if (!el) return;
        new Chart(el, {
            type: 'line',
            data: {
                labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
                datasets: [{
                    data,
                    borderColor: color,
                    backgroundColor: `${color}20`,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { display: false }, y: { display: false } }
            }
        });
    };

    lineChart('hrChart', Array.from({ length: 24 }, () => 60 + Math.random() * 30), '#ef4444');
    lineChart('bpChart', Array.from({ length: 24 }, () => 110 + Math.random() * 30), '#3b82f6');
    lineChart('oxChart', Array.from({ length: 24 }, () => 95 + Math.random() * 3), '#10b981');

    const actChart = document.getElementById('actChart');
    if (actChart) {
        new Chart(actChart, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    data: Array.from({ length: 7 }, () => 3000 + Math.random() * 8000),
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
    }
}
