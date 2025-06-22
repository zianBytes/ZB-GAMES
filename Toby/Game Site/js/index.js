// Debug function to check if elements exist
function checkElements() {
    console.log('=== Element Check ===');
    const elements = {
        gamesContainer: document.querySelector('.games-container'),
        gameContainer: document.getElementById('gameContainer'),
        gameCanvas: document.getElementById('gameCanvas'),
        exploreBtn: document.getElementById('exploreBtn'),
        storyboardSection: document.querySelector('.storyboard-section'),
        gamesSection: document.getElementById('gamesSection'),
        timeline: document.querySelector('.timeline'),
        gameCards: document.querySelectorAll('.timeline-content.game-card')
    };

    Object.entries(elements).forEach(([name, element]) => {
        if (name === 'gameCards') {
            console.log(`${name}: Found ${element.length} cards`);
            element.forEach((card, index) => {
                console.log(`Game Card ${index}:`, {
                    display: getComputedStyle(card).display,
                    visibility: getComputedStyle(card).visibility,
                    opacity: getComputedStyle(card).opacity
                });
            });
        } else {
        console.log(`${name}:`, element ? 'Found' : 'Not Found');
        if (element) {
            console.log(`${name} styles:`, {
                    display: getComputedStyle(element).display,
                    visibility: getComputedStyle(element).visibility,
                    opacity: getComputedStyle(element).opacity
            });
            }
        }
    });
}

// Force games section to be visible
function ensureGamesVisible() {
    console.log('=== Ensuring Games Are Visible ===');
    
    // Get all game-related elements
    const gamesSection = document.getElementById('gamesSection');
    const storyboardSection = document.querySelector('.storyboard-section');
    const timeline = document.querySelector('.timeline');
    const gameCards = document.querySelectorAll('.timeline-content.game-card');
    const storyCards = document.querySelectorAll('.timeline-content.story');
    
    // Force display for main containers
    if (gamesSection) {
        gamesSection.style.display = 'block';
        gamesSection.style.visibility = 'visible';
        gamesSection.style.opacity = '1';
        console.log('Games section forced visible');
    }
    
    if (storyboardSection) {
        storyboardSection.style.display = 'block';
        storyboardSection.style.visibility = 'visible';
        storyboardSection.style.opacity = '1';
        storyboardSection.style.filter = 'blur(0px)';
        console.log('Storyboard section forced visible');
    }
    
    if (timeline) {
        timeline.style.display = 'flex';
        timeline.style.visibility = 'visible';
        timeline.style.opacity = '1';
        console.log('Timeline forced visible');
    }
    
    // Force visibility for all game and story cards
    gameCards.forEach((card, index) => {
        card.style.display = 'block';
        card.style.visibility = 'visible';
        card.style.opacity = '1';
        console.log(`Game card ${index} forced visible`);
    });
    
    storyCards.forEach((card, index) => {
        card.style.display = 'block';
        card.style.visibility = 'visible';
        card.style.opacity = '1';
        console.log(`Story card ${index} forced visible`);
    });
    
    // Remove any problematic classes from body
    document.body.classList.remove('installing');
    document.body.classList.add('installation-complete');
    
    console.log('All games elements forced visible!');
}

// ============================================
// 🖼️ Back to reliable image thumbnails!
// ============================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM Loaded ===');
    checkElements();
    
    // Force games section to be visible
    ensureGamesVisible();
    
    // Start cinematic installation sequence
    // startCinematicInstallation(); // Commented out - no longer needed without letters

    // Logo dropdown functionality
    const logoButton = document.querySelector('.logo-button');
    const logoDropdown = document.querySelector('.logo-dropdown');

    if (logoButton && logoDropdown) {
        logoButton.addEventListener('click', (e) => {
            e.stopPropagation();
            logoDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!logoButton.contains(e.target) && !logoDropdown.contains(e.target)) {
                logoDropdown.classList.remove('active');
            }
        });
    }

    // Online modal
    const modal = document.getElementById("onlineModal");
    const onlineBtn = document.getElementById("onlineBtn");
    const closeBtn = document.querySelector(".close-modal");

    if (onlineBtn && modal) {
        onlineBtn.addEventListener('click', function() {
            modal.style.display = "flex";
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Smooth scroll for Explore button
    var exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            console.log('Explore clicked!');
            
            // Play sound
            playSound(spaceBlip);
            
            // Ensure games are visible before scrolling
            ensureGamesVisible();
            
            // Small delay to ensure visibility
            setTimeout(() => {
                // Scroll to games section
            var timeline = document.querySelector('.storyboard-section');
            if (timeline && timeline.scrollIntoView) {
                timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    console.log('Scrolling to timeline');
            } else if (timeline) {
                var top = timeline.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: top, behavior: 'smooth' });
                    console.log('Scrolling to timeline (fallback)');
                } else {
                    console.log('Timeline not found');
            }
            }, 100);
        });
    } else {
        console.log('Explore button not found');
    }

    // Fade in storyboard when hero is out of view
    function handleStoryboardFade() {
        var hero = document.querySelector('.hero-banner');
        var storyboard = document.querySelector('.storyboard-section');
        if (!hero || !storyboard) return;
        var heroRect = hero.getBoundingClientRect();
        if (heroRect.bottom < 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleStoryboardFade);
    handleStoryboardFade();

    // --- PARTICLES AND SOUND (LETTERS REMOVED) ---
    // const floatingLetters = document.querySelectorAll('.floating-letter'); // Commented out - no letters
    const particleContainer = document.getElementById('particle-container');
    const muteBtn = document.getElementById('muteBtn');
    const muteIcon = document.getElementById('muteIcon');
    
    // Make these global for installation sequence
    window.isMuted = false;
    // window.installationSounds = { // Commented out - no installation system
    //     mechanical: new Audio('assets/sounds/space-blip.mp3'),
    //     complete: new Audio('assets/sounds/boing.mp3')
    // };

    // Load sounds
    const bounceSound = new Audio('assets/sounds/boing.mp3');
    bounceSound.volume = 0.5;
    const spaceBlip = new Audio('assets/sounds/space-blip.mp3');
    spaceBlip.volume = 0.5;

    function playSound(sound) {
        if (!window.isMuted) {
            sound.currentTime = 0;
            sound.play();
        }
    }
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            window.isMuted = !window.isMuted;
            muteBtn.setAttribute('data-muted', window.isMuted);
        });
    }

    // Particle effect
    function emitParticles(x, y, color = '#00a2ff') {
        for (let i = 0; i < 18; i++) {
            const p = document.createElement('div');
            p.className = 'neon-particle';
            p.style.left = x + 'px';
            p.style.top = y + 'px';
            p.style.background = color;
            p.style.boxShadow = `0 0 12px ${color}, 0 0 24px #fff`;
            p.style.transform = `scale(${0.7 + Math.random() * 0.6})`;
            const angle = Math.random() * 2 * Math.PI;
            const dist = 40 + Math.random() * 40;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist;
            p.animate([
                { transform: p.style.transform, opacity: 1 },
                { transform: `translate(${dx}px,${dy}px) scale(0.2)`, opacity: 0 }
            ], {
                duration: 700 + Math.random() * 400,
                easing: 'cubic-bezier(.5,1.5,.5,1)',
                fill: 'forwards'
            });
            setTimeout(() => p.remove(), 900);
            particleContainer.appendChild(p);
        }
    }

    // Enhanced Wind System - COMMENTED OUT (no letters)
    // let windDirection = 0;
    // let windStrength = 0;
    
    // function updateWind() {
    //     windDirection += (Math.random() - 0.5) * 0.1;
    //     windStrength = Math.sin(Date.now() * 0.001) * 0.5 + 0.5;
        
    //     // Apply gentle wind to floating letters
    //     floatingLetters.forEach((letter, index) => {
    //         const windForce = Math.sin(Date.now() * 0.002 + index * 0.5) * windStrength * 2;
    //         if (letter.style) {
    //             letter.style.transform = `translateX(${windForce}px) rotate(${windForce * 0.1}deg)`;
    //         }
    //     });
    // }
    
    // // Update wind every frame
    // setInterval(updateWind, 50);

    // Clean floating physics for each letter - COMMENTED OUT (no letters)
    // floatingLetters.forEach((letter, index) => {
    //     let isDragging = false, startY = 0, lastY = 0, velocity = 0, animFrame;
    //     let restY = 0, y = 0, rotation = 0, rotationVelocity = 0;
        
    //     // Add enhanced hover effect that complements ambient lighting
    //     letter.addEventListener('mouseenter', () => {
    //         letter.style.filter = `
    //             drop-shadow(0 8px 20px rgba(0, 0, 0, 0.2))
    //             drop-shadow(0 0 30px rgba(52, 152, 219, 0.3))
    //             drop-shadow(0 0 60px rgba(52, 152, 219, 0.2))
    //         `;
    //     });
        
    //     letter.addEventListener('mouseleave', () => {
    //         letter.style.filter = `
    //             drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))
    //         `;
    //     });
    //     function setY(val) {
    //         y = val;
    //         rotation += rotationVelocity;
    //         letter.style.transform = `translateY(${y}px) rotate(${rotation}deg)`;
    //     }
    //     function animateFloat() {
    //         // Clean floating physics
    //         velocity += (restY - y) * 0.18;
    //         velocity *= 0.88;
            
    //         // Add gentle rotation physics
    //         rotationVelocity += (0 - rotation) * 0.12;
    //         rotationVelocity *= 0.90;
            
    //         setY(y + velocity);
            
    //         // Gentle chain reaction - influence nearby letters
    //         if (Math.abs(velocity) > 3) {
    //             floatingLetters.forEach((otherLetter, otherIndex) => {
    //                 if (otherLetter !== letter && Math.abs(otherIndex - index) <= 1) {
    //                     const influence = velocity * 0.2;
    //                     if (otherLetter.style) {
    //                         otherLetter.style.transform += ` translateY(${influence}px)`;
    //                     }
    //                 }
    //             });
    //         }
            
    //         if (Math.abs(velocity) > 0.3 || Math.abs(y - restY) > 0.3 || Math.abs(rotationVelocity) > 0.1) {
    //             animFrame = requestAnimationFrame(animateFloat);
    //         } else {
    //             setY(restY);
    //             velocity = 0;
    //             rotation = 0;
    //             rotationVelocity = 0;
    //             animFrame = null;
    //         }
    //     }
    //     function bounce(e, force = 1) {
    //         playSound(bounceSound);
    //         const rect = letter.getBoundingClientRect();
            
    //         // Clean particle effects that complement ambient lighting
    //         const particleColors = ['#3498db', '#52a3db', '#1abc9c', '#16a085', '#3498db'];
    //         emitParticles(rect.left + rect.width/2, rect.top + rect.height/2, particleColors[index % particleColors.length]);
            
    //         // Add extra sparkle particles for bigger bounces
    //         if (force > 1) {
    //             setTimeout(() => {
    //                 emitParticles(rect.left + rect.width/2, rect.top + rect.height/2, '#52a3db');
    //             }, 100);
    //         }
            
    //         velocity = 12 * force; // Gentler bounce
    //         rotationVelocity = (Math.random() - 0.5) * 6 * force; // Less rotation
            
    //         // Gentle screen shake for big bounces
    //         if (force > 1.2) {
    //             document.body.style.animation = 'screenShake 0.2s ease-in-out';
    //             setTimeout(() => {
    //                 document.body.style.animation = '';
    //             }, 200);
    //         }
            
    //         if (!animFrame) animateFloat();
    //     }
    //     // Mouse/touch drag
    //     function onPointerDown(e) {
    //         isDragging = true;
    //         startY = (e.touches ? e.touches[0].clientY : e.clientY) - y;
    //         document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', onPointerMove);
    //         document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', onPointerUp);
    //     }
    //     function onPointerMove(e) {
    //         if (!isDragging) return;
    //         lastY = (e.touches ? e.touches[0].clientY : e.clientY) - startY;
    //         setY(Math.max(0, lastY));
    //     }
    //     function onPointerUp(e) {
    //         isDragging = false;
    //         bounce(e, Math.min(1.5, Math.abs(y/60)));
    //         document.removeEventListener(e.type === 'touchend' ? 'touchmove' : 'mousemove', onPointerMove);
    //         document.removeEventListener(e.type === 'touchend' ? 'touchend' : 'mouseup', onPointerUp);
    //     }
    //     letter.addEventListener('mousedown', onPointerDown);
    //     letter.addEventListener('touchstart', onPointerDown, { passive: false });
    //     letter.addEventListener('click', e => bounce(e, 1));
    //     letter.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') bounce(e, 1); });
    // });

    // Explore button sound is now handled above with scroll functionality

    // Neon particle CSS
    const style = document.createElement('style');
    style.textContent = `
    .neon-particle {
        position: absolute;
        width: 12px; height: 12px;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.85;
        z-index: 100;
    }
    `;
    document.head.appendChild(style);
});

// ============================================
// 🎬 SIMPLE CLEANUP SYSTEM
// ============================================

// function startCinematicInstallation() { // COMMENTED OUT - no letters/installation
//     // Clean and simple - just remove any installation-related elements
//     setTimeout(() => {
//         const installationSystem = document.querySelector('.installation-system');
//         if (installationSystem) {
//             installationSystem.remove();
//         }
        
//         // Ensure floating letters are visible and interactive
//         const floatingLetters = document.querySelectorAll('.floating-letter');
//         floatingLetters.forEach(letter => {
//             letter.style.opacity = '1';
//             letter.style.visibility = 'visible';
//         });
        
//         // Ensure games are visible
//         ensureGamesVisible();
//     }, 500);
// }

// ============================================
// 🤖 MASCOT ANIMATION CONTROLLER
// ============================================

class MascotAnimationController {
    constructor() {
        console.log('🤖 MascotController: Constructor called');
        this.mascotContainer = document.getElementById('mascotContainer');
        this.mascot = document.getElementById('mascot');
        this.speechBubble = document.getElementById('speechBubble');
        this.speechContent = document.getElementById('speechContent');
        
        // Log if elements are found
        console.log('🤖 MascotController: Elements found:', {
            container: !!this.mascotContainer,
            mascot: !!this.mascot,
            speechBubble: !!this.speechBubble,
            speechContent: !!this.speechContent
        });

        this.animationStarted = false;
        this.timeouts = [];
        this.clickCount = 0;
        this.lastClickTime = 0;
        this.clickMessages = [
            "DO NOT TOUCH ME",
            "What is wrong with you?",
            "Ik I'm hot but damn",
            "Sybau"
        ];
        this.setupMascotInteraction();
    }

    setupMascotInteraction() {
        if (this.mascot) {
            this.mascot.addEventListener('click', () => this.handleMascotClick());
        }
    }

    handleMascotClick() {
        const currentTime = Date.now();
        
        // Reset click sequence if it's been more than 5 seconds since last click
        if (currentTime - this.lastClickTime > 5000) {
            this.clickCount = 0;
            this.showSpeechWithDelete("I'm glad you chose peace", -1);
        } else {
            // Cycle through click messages
            const messageIndex = this.clickCount % this.clickMessages.length;
            this.showSpeechWithDelete(this.clickMessages[messageIndex], -1);
            this.clickCount++;
        }
        
        this.lastClickTime = currentTime;
    }

    init() {
        // Only run animation once when page loads
        if (!this.animationStarted) {
            this.startIntroSequence();
            this.animationStarted = true;
        }
    }

    startIntroSequence() {
        console.log('🤖 Starting intro sequence...');
        
        // Ensure mascot starts at center
        this.resetMascotPosition();
        
        // Immediately: Show first speech for 5 seconds
        this.showSpeech("Oh who is you?", 5000);

        // At 5 seconds: Move mascot to left
        console.log('🤖 Scheduling move to left in 5 seconds...');
        this.timeouts.push(setTimeout(() => {
            console.log('🤖 5 seconds elapsed, moving mascot...');
            this.moveMascotToLeft();
        }, 5000));

        // At 7 seconds: Show introduction speech
        this.timeouts.push(setTimeout(() => {
            console.log('🤖 Showing: Hi I\'m Morich');
            this.showSpeechWithDelete("Hi I'm Morich", 3000);
        }, 7000));

        // At 10 seconds: Change to welcome message
        this.timeouts.push(setTimeout(() => {
            console.log('🤖 Showing: Umm Welcome ig');
            this.showSpeechWithDelete("Umm Welcome ig", -1);
        }, 10000));
    }

    showSpeechWithDelete(message, duration = -1) {
        // First, add the deleting animation to current text
        this.speechContent.classList.add('deleting');
        
        // After deletion animation, show new text
        setTimeout(() => {
            this.showSpeech(message, duration);
        }, 500); // Match this with the CSS animation duration
    }

    showSpeech(message, duration = -1) {
        console.log('🤖 showSpeech called with:', message);
        
        // Force hide first, then show after a tiny delay
        this.speechBubble.classList.remove('show');
        this.speechContent.classList.remove('typing', 'deleting');
        
        setTimeout(() => {
            // Clear any existing content
            this.speechContent.textContent = '';
            
            // Set new message
            this.speechContent.textContent = message;
            
            // Show speech bubble with animation
            this.speechBubble.classList.add('show');
            
            // Add typing effect
            this.speechContent.classList.add('typing');
            
            console.log('🤖 Speech bubble should now be visible with:', message);
        }, 100);
        
        // Hide after duration if specified
        if (duration > 0) {
            this.timeouts.push(setTimeout(() => {
                this.hideSpeech();
            }, duration + 100));
        }
    }

    hideSpeech() {
        this.speechBubble.classList.remove('show');
        this.speechContent.classList.remove('typing', 'deleting');
    }

    moveMascotToLeft() {
        console.log('🤖 Moving mascot to left position...');
        
        if (!this.mascotContainer) {
            console.error('🤖 Error: mascotContainer not found!');
            return;
        }
        
        // Hide current speech first
        this.hideSpeech();
        
        // Move mascot to left position
        this.mascotContainer.classList.add('positioned-left');
        console.log('🤖 Added positioned-left class to container');
        
        // Update speech bubble position
        if (this.speechBubble) {
            this.speechBubble.classList.add('positioned-left');
            console.log('🤖 Added positioned-left class to speech bubble');
        }

        // Log the current classes on the container
        console.log('🤖 Current classes on container:', this.mascotContainer.className);
    }

    resetMascotPosition() {
        this.mascotContainer.classList.remove('positioned-left');
        this.speechBubble.classList.remove('positioned-left', 'show');
    }

    // Method to manually trigger animation (for testing)
    restart() {
        console.log('🤖 Restarting mascot animation...');
        
        // Clear all timeouts
        this.timeouts.forEach(timeout => clearTimeout(timeout));
        this.timeouts = [];
        
        // Reset position and state
        this.resetMascotPosition();
        this.animationStarted = false;
        this.clickCount = 0;
        this.lastClickTime = 0;
        
        // Restart sequence
        setTimeout(() => {
            this.init();
        }, 500);
    }

    // Method to skip to final state (useful for development)
    skipToEnd() {
        this.timeouts.forEach(timeout => clearTimeout(timeout));
        this.timeouts = [];
        this.moveMascotToLeft();
        setTimeout(() => {
            this.showSpeech("Umm Welcome ig", -1);
        }, 2000);
    }
}

// Initialize mascot controller
console.log('🤖 Creating MascotController instance...');
const mascotController = new MascotAnimationController();

// Start animation when page loads
window.addEventListener('load', () => {
    console.log('🤖 Window load event fired');
    // Longer delay to ensure everything is loaded and stable
    setTimeout(() => {
        console.log('🤖 Starting initialization...');
        mascotController.init();
    }, 2000);
});

// Optional: Add controls for testing (remove in production)
if (window.location.hash === '#dev') {
    console.log('🤖 Developer mode activated');
    window.mascotController = mascotController;
    
    // Add keyboard shortcuts for testing
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'r':
                    e.preventDefault();
                    mascotController.restart();
                    break;
                case 's':
                    e.preventDefault();
                    mascotController.skipToEnd();
                    break;
            }
        }
    });
}


