document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Profile image upload preview
    const profileUpload = document.getElementById('profileUpload');
    const profilePreview = document.getElementById('profilePreview');
    
    profileUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePreview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
    
    // Password strength indicator
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strengthBars = document.querySelectorAll('.strength-bar');
            const strengthText = document.querySelector('.password-strength span');
            const password = this.value;
            
            // Reset bars
            strengthBars.forEach(bar => {
                bar.style.backgroundColor = '';
                bar.classList.remove('medium', 'strong');
            });
            
            if (password.length > 0) {
                // Very basic strength check (in real app use proper validation)
                if (password.length < 6) {
                    strengthBars[0].style.backgroundColor = 'var(--danger)';
                    strengthText.textContent = 'Weak';
                } else if (password.length < 10) {
                    strengthBars[0].style.backgroundColor = 'var(--warning)';
                    strengthBars[1].style.backgroundColor = 'var(--warning)';
                    strengthText.textContent = 'Medium';
                } else {
                    strengthBars[0].style.backgroundColor = 'var(--secondary)';
                    strengthBars[1].style.backgroundColor = 'var(--secondary)';
                    strengthBars[2].style.backgroundColor = 'var(--secondary)';
                    strengthText.textContent = 'Strong';
                }
            } else {
                strengthText.textContent = '';
            }
        });
    }
    
    // Save button functionality
    document.querySelector('.btn-save').addEventListener('click', function() {
        // In a real app, this would save all settings
        showNotification('Settings saved successfully');
    });
    
    // Danger zone buttons
    document.querySelector('.btn-export-data').addEventListener('click', function() {
        if (confirm('Export all your data? This may take several minutes.')) {
            showNotification('Data export started. You will receive an email when ready.');
        }
    });
    
    document.querySelector('.btn-reset-preferences').addEventListener('click', function() {
        if (confirm('Reset all preferences to default values?')) {
            showNotification('Preferences reset to defaults');
        }
    });
    
    document.querySelector('.btn-delete-account').addEventListener('click', function() {
        if (confirm('Are you absolutely sure? This will permanently delete your account and all associated data.')) {
            if (prompt('Type "DELETE" to confirm:') === 'DELETE') {
                alert('Account deletion scheduled. You will receive a confirmation email.');
            }
        }
    });
    
    // Integration connect/disconnect
    document.querySelectorAll('.btn-connect').forEach(btn => {
        btn.addEventListener('click', function() {
            const integration = this.closest('.integration-item');
            integration.classList.add('connected');
            this.textContent = 'Disconnect';
            this.classList.remove('btn-connect');
            this.classList.add('btn-disconnect');
            showNotification('Integration connected successfully');
        });
    });
    
    document.querySelectorAll('.btn-disconnect').forEach(btn => {
        btn.addEventListener('click', function() {
            const integration = this.closest('.integration-item');
            integration.classList.remove('connected');
            this.textContent = 'Connect';
            this.classList.remove('btn-disconnect');
            this.classList.add('btn-connect');
            showNotification('Integration disconnected');
        });
    });
    
    // Helper function for notifications
    function showNotification(message) {
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
});