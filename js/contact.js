document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Create floating particles
    createParticles();

    const form = document.getElementById('contactForm');
    const steps = document.querySelectorAll('.step');
    const progressFill = document.querySelector('.progress-fill');
    const inputs = document.querySelectorAll('.cyber-input input, .cyber-input select, .cyber-input textarea');
    const contactCard = document.querySelector('.contact-card');
    const submitButton = document.querySelector('.cyber-button');
    let currentStep = 1;

    // Handle submit button hover effect
    if (submitButton) {
        submitButton.addEventListener('mousemove', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            e.target.style.setProperty('--x', `${x}%`);
            e.target.style.setProperty('--y', `${y}%`);
        });
    }

    // Handle card flip
    if (contactCard) {
        const flipButtons = contactCard.querySelectorAll('.flip-trigger');
        flipButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                contactCard.classList.toggle('flipped');
            });
        });

        // Prevent flip when clicking social links
        const socialLinks = contactCard.querySelectorAll('.social-item');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }

    // Function to create floating particles
    function createParticles() {
        const container = document.querySelector('.floating-particles');
        if (!container) return;

        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(0, 255, 255, ${Math.random() * 0.3});
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${5 + Math.random() * 5}s linear infinite;
                animation-delay: -${Math.random() * 5}s;
            `;
            container.appendChild(particle);
        }
    }

    // Initialize form fields
    inputs.forEach(input => {
        // Set initial placeholder to empty to allow for label animation
        input.setAttribute('placeholder', ' ');

        // Handle focus events
        input.addEventListener('focus', () => {
            input.closest('.cyber-input').classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.closest('.cyber-input').classList.remove('focused');
        });

        // Handle input events
        input.addEventListener('input', () => {
            validateInput(input);
            updateProgress();
        });
    });

    // Validate single input
    function validateInput(input) {
        const wrapper = input.closest('.cyber-input');
        const isValid = input.value.trim() !== '';
        
        wrapper.classList.toggle('has-value', isValid);
        wrapper.classList.toggle('is-valid', isValid);
        
        return isValid;
    }

    // Update progress bar
    function updateProgress() {
        const totalInputs = inputs.length;
        const validInputs = Array.from(inputs).filter(input => validateInput(input)).length;
        const progress = (validInputs / totalInputs) * 100;
        
        progressFill.style.setProperty('--progress', `${progress}%`);

        // Update steps
        steps.forEach((step, index) => {
            const stepInputs = getStepInputs(index + 1);
            const isStepValid = stepInputs.every(input => validateInput(input));
            
            if (isStepValid) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // Get inputs for a specific step
    function getStepInputs(step) {
        switch(step) {
            case 1:
                return [document.querySelector('[name="name"]')];
            case 2:
                return [
                    document.querySelector('[name="email"]'),
                    document.querySelector('[name="subject"]')
                ];
            case 3:
                return [document.querySelector('[name="message"]')];
            default:
                return [];
        }
    }

    // Handle form submission
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = form.querySelector('.cyber-button');
            if (!submitButton) return;

            // Validate all inputs
            const isValid = Array.from(inputs).every(validateInput);
            if (!isValid) {
                showNotification('error', 'Please fill in all fields');
                return;
            }

            // Add loading state
            submitButton.classList.add('loading');
            submitButton.disabled = true;

            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                showNotification('success', 'Message sent successfully!');
                
                // Reset form
                form.reset();
                inputs.forEach(input => {
                    input.closest('.cyber-input').classList.remove('has-value', 'is-valid');
                });
                updateProgress();
                
            } catch (error) {
                showNotification('error', 'Failed to send message. Please try again.');
            } finally {
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
            }
        });
    }

    // Show notification
    function showNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `cyber-notification ${type}`;
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <div class="notification-progress"></div>
        `;

        document.body.appendChild(notification);

        // Add show class after a small delay for animation
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        // Remove notification after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Initialize
    updateProgress();
});

function validateForm(data) {
    // Name validation
    if (!data.name.trim()) {
        showNotification('Please enter your name', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Subject validation
    if (!data.subject) {
        showNotification('Please select a subject', 'error');
        return false;
    }
    
    // Message validation
    if (!data.message.trim()) {
        showNotification('Please enter your message', 'error');
        return false;
    }
    
    return true;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.3s ease-out';
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#f44336';
            break;
        default:
            notification.style.backgroundColor = '#2196F3';
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data:', data);
            resolve();
        }, 1500);
    });
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 