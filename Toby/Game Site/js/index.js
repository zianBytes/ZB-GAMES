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
    startCinematicInstallation();

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

    // --- SPRINGY LETTERS, PARTICLES, AND SOUND ---
    const springLetters = document.querySelectorAll('.spring-letter');
    const particleContainer = document.getElementById('particle-container');
    const muteBtn = document.getElementById('muteBtn');
    const muteIcon = document.getElementById('muteIcon');
    
    // Make these global for installation sequence
    window.isMuted = false;
    window.installationSounds = {
        mechanical: new Audio('assets/sounds/space-blip.mp3'),
        complete: new Audio('assets/sounds/boing.mp3')
    };

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
            muteIcon.textContent = window.isMuted ? '🔇' : '🔊';
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

    // Enhanced Wind System
    let windDirection = 0;
    let windStrength = 0;
    
    function updateWind() {
        windDirection += (Math.random() - 0.5) * 0.1;
        windStrength = Math.sin(Date.now() * 0.001) * 0.5 + 0.5;
        
        // Apply wind to all letters
        springLetters.forEach((letter, index) => {
            const windForce = Math.sin(Date.now() * 0.002 + index * 0.5) * windStrength * 3;
            const container = letter.parentElement;
            container.style.transform = `translateX(${windForce}px) rotate(${windForce * 0.2}deg)`;
        });
    }
    
    // Update wind every frame
    setInterval(updateWind, 50);

    // Enhanced Spring physics for each letter
    springLetters.forEach((letter, index) => {
        let isDragging = false, startY = 0, lastY = 0, velocity = 0, animFrame;
        let restY = 0, y = 0, rotation = 0, rotationVelocity = 0;
        const color = getComputedStyle(letter).color;
        
        // Add interactive glow effect
        letter.addEventListener('mouseenter', () => {
            letter.style.filter = `
                drop-shadow(4px 8px 12px rgba(0, 0, 0, 0.4))
                drop-shadow(0 0 30px rgba(52, 152, 219, 0.8))
                drop-shadow(0 0 40px rgba(26, 188, 156, 0.6))
            `;
        });
        
        letter.addEventListener('mouseleave', () => {
            letter.style.filter = `
                drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))
                drop-shadow(0 0 20px rgba(52, 152, 219, 0.4))
            `;
        });
        function setY(val) {
            y = val;
            rotation += rotationVelocity;
            letter.style.transform = `translateY(${y}px) rotate(${rotation}deg)`;
            const string = letter.parentElement.querySelector('.spring-string path');
            if (string) {
                // Realistic long string physics with proper curves
                const stretch = y * 0.6;
                const segments = 8; // More segments for smoother curve
                const points = [];
                
                // Create realistic pendulum curve
                for (let i = 0; i <= segments; i++) {
                    const t = i / segments;
                    const baseY = t * (240 + stretch);
                    const swayX = 4 + Math.sin(t * Math.PI * 2) * (stretch * 0.02);
                    points.push(`${i === 0 ? 'M' : 'L'}${swayX} ${baseY}`);
                }
                
                string.setAttribute('d', points.join(' '));
                
                // Enhanced tension-based color changes
                const tension = Math.min(1, Math.abs(y) / 120);
                const red = Math.floor(44 + tension * 100);
                const green = Math.floor(62 + tension * 60);
                const blue = Math.floor(80 + tension * 40);
                string.setAttribute('stroke', `rgb(${red}, ${green}, ${blue})`);
                
                // Add string glow for high tension
                if (tension > 0.5) {
                    string.setAttribute('filter', `drop-shadow(0 0 ${tension * 8}px rgb(${red}, ${green}, ${blue}))`);
                } else {
                    string.setAttribute('filter', 'drop-shadow(1px 2px 3px rgba(44, 62, 80, 0.8))');
                }
            }
        }
        function animateSpring() {
            // Enhanced spring physics
            velocity += (restY - y) * 0.22;
            velocity *= 0.82;
            
            // Add rotation physics
            rotationVelocity += (0 - rotation) * 0.15;
            rotationVelocity *= 0.85;
            
            setY(y + velocity);
            
            // Chain reaction - influence nearby letters
            if (Math.abs(velocity) > 5) {
                springLetters.forEach((otherLetter, otherIndex) => {
                    if (otherLetter !== letter && Math.abs(otherIndex - index) <= 1) {
                        const influence = velocity * 0.3;
                        const otherContainer = otherLetter.parentElement;
                        otherContainer.style.transform += ` translateY(${influence}px)`;
                    }
                });
            }
            
            if (Math.abs(velocity) > 0.5 || Math.abs(y - restY) > 0.5 || Math.abs(rotationVelocity) > 0.1) {
                animFrame = requestAnimationFrame(animateSpring);
            } else {
                setY(restY);
                velocity = 0;
                rotation = 0;
                rotationVelocity = 0;
                animFrame = null;
            }
        }
        function bounce(e, force = 1) {
            playSound(bounceSound);
            const rect = letter.getBoundingClientRect();
            
            // Enhanced particle effects
            const particleColors = ['#3498db', '#2980b9', '#1abc9c', '#16a085', '#f39c12'];
            emitParticles(rect.left + rect.width/2, rect.top + rect.height/2, particleColors[index % particleColors.length]);
            
            // Add extra sparkle particles for bigger bounces
            if (force > 1) {
                setTimeout(() => {
                    emitParticles(rect.left + rect.width/2, rect.top + rect.height/2, '#f1c40f');
                }, 100);
            }
            
            velocity = 18 * force;
            rotationVelocity = (Math.random() - 0.5) * 10 * force;
            
            // Screen shake for big bounces
            if (force > 1.2) {
                document.body.style.animation = 'screenShake 0.3s ease-in-out';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 300);
            }
            
            if (!animFrame) animateSpring();
        }
        // Mouse/touch drag
        function onPointerDown(e) {
            isDragging = true;
            startY = (e.touches ? e.touches[0].clientY : e.clientY) - y;
            document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', onPointerMove);
            document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', onPointerUp);
        }
        function onPointerMove(e) {
            if (!isDragging) return;
            lastY = (e.touches ? e.touches[0].clientY : e.clientY) - startY;
            setY(Math.max(0, lastY));
        }
        function onPointerUp(e) {
            isDragging = false;
            bounce(e, Math.min(1.5, Math.abs(y/60)));
            document.removeEventListener(e.type === 'touchend' ? 'touchmove' : 'mousemove', onPointerMove);
            document.removeEventListener(e.type === 'touchend' ? 'touchend' : 'mouseup', onPointerUp);
        }
        letter.addEventListener('mousedown', onPointerDown);
        letter.addEventListener('touchstart', onPointerDown, { passive: false });
        letter.addEventListener('click', e => bounce(e, 1));
        letter.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') bounce(e, 1); });
    });

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
// 🎬 CINEMATIC INSTALLATION SYSTEM
// ============================================

function startCinematicInstallation() {
    const installationSystem = document.querySelector('.installation-system');
    const progressFill = document.getElementById('progressFill');
    const installStatus = document.getElementById('installStatus');
    const letters = document.querySelectorAll('.spring-letter');
    
    // Set installing state
    document.body.classList.add('installing');
    
    // Installation sequence phases
    const phases = [
        { progress: 15, status: "INITIALIZING INSTALLATION MATRIX...", duration: 800 },
        { progress: 30, status: "CALIBRATING ROBOTIC SYSTEMS...", duration: 600 },
        { progress: 45, status: "SCANNING LETTER POSITIONS...", duration: 700 },
        { progress: 60, status: "DEPLOYING INSTALLATION ANCHORS...", duration: 900 },
        { progress: 80, status: "INSTALLING LETTERS Z-B-G-A-M-E-S...", duration: 2800 },
        { progress: 95, status: "TESTING PHYSICS SYSTEMS...", duration: 600 },
        { progress: 100, status: "INSTALLATION COMPLETE!", duration: 500 }
    ];
    
    let currentPhase = 0;
    
    // Create space particles
    createSpaceParticles();
    
    function nextPhase() {
        if (currentPhase >= phases.length) {
            completeInstallation();
            return;
        }
        
        const phase = phases[currentPhase];
        progressFill.style.width = phase.progress + '%';
        installStatus.textContent = phase.status;
        
        // Create installation sparks during key phases
        if (phase.progress >= 60 && phase.progress <= 80) {
            createInstallationSparks();
            // Play mechanical sound
            if (!window.isMuted) {
                const mechanicalSound = window.installationSounds.mechanical.cloneNode();
                mechanicalSound.playbackRate = 0.8;
                mechanicalSound.volume = 0.3;
                mechanicalSound.play();
            }
        }
        
        // Trigger letter installations
        if (phase.progress === 80) {
            triggerLetterInstallations();
        }
        
        // Play completion sound
        if (phase.progress === 100) {
            if (!window.isMuted) {
                const completeSound = window.installationSounds.complete.cloneNode();
                completeSound.playbackRate = 1.2;
                completeSound.volume = 0.6;
                setTimeout(() => completeSound.play(), 500);
            }
        }
        
        currentPhase++;
        setTimeout(nextPhase, phase.duration);
    }
    
    // Start installation sequence
    setTimeout(nextPhase, 500);
    
    function completeInstallation() {
        setTimeout(() => {
            installationSystem.classList.add('complete');
            letters.forEach(letter => {
                letter.classList.remove('installing');
                letter.classList.add('installed');
            });
            
            // Activate Space Command Center
            document.body.classList.remove('installing');
            document.body.classList.add('installation-complete');
            
            // Ensure games are visible after installation
            ensureGamesVisible();
            
            // Create command center particles
            createCommandCenterParticles();
            
            // Enable advanced physics after installation
            setTimeout(enableAdvancedPhysics, 1000);
        }, 1000);
    }
}

function createSpaceParticles() {
    const container = document.getElementById('spaceParticles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'space-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 4) + 's';
        container.appendChild(particle);
    }
}

function createInstallationSparks() {
    const container = document.getElementById('installationSparks');
    const letters = document.querySelectorAll('.spring-letter-container');
    
    letters.forEach((letterContainer, index) => {
        setTimeout(() => {
            const rect = letterContainer.getBoundingClientRect();
            for (let i = 0; i < 8; i++) {
                const spark = document.createElement('div');
                spark.className = 'installation-spark';
                spark.style.left = (rect.left + rect.width / 2) + 'px';
                spark.style.top = (rect.top + 100) + 'px';
                spark.style.animationDelay = (i * 0.1) + 's';
                container.appendChild(spark);
                
                setTimeout(() => spark.remove(), 1500);
            }
        }, index * 200);
    });
}

function triggerLetterInstallations() {
    const letters = document.querySelectorAll('.spring-letter');
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.setProperty('--letter-index', index);
        }, index * 400);
    });
}

function enableAdvancedPhysics() {
    const letters = document.querySelectorAll('.spring-letter.installed');
    
    letters.forEach((letter, index) => {
        // Enhanced collision detection
        let isDragging = false;
        let position = { x: 0, y: 0 };
        let velocity = { x: 0, y: 0 };
        let lastPosition = { x: 0, y: 0 };
        
        function updatePhysics() {
            if (!isDragging) {
                // Apply physics
                const restoring = 0.08;
                const damping = 0.92;
                
                velocity.x += (0 - position.x) * restoring;
                velocity.y += (0 - position.y) * restoring;
                velocity.x *= damping;
                velocity.y *= damping;
                
                position.x += velocity.x;
                position.y += velocity.y;
                
                // Check collisions with nearby letters
                checkCollisions(letter, index, position);
                
                // Update visual position
                updateLetterTransform(letter, position);
                
                // Continue physics if still moving
                if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1 || 
                    Math.abs(position.x) > 0.1 || Math.abs(position.y) > 0.1) {
                    requestAnimationFrame(updatePhysics);
                }
            }
        }
        
        // Enhanced interaction handlers
        letter.addEventListener('mousedown', (e) => {
            isDragging = true;
            lastPosition = { x: e.clientX, y: e.clientY };
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', onRelease);
        });
        
        function onDrag(e) {
            if (!isDragging) return;
            const deltaX = e.clientX - lastPosition.x;
            const deltaY = e.clientY - lastPosition.y;
            
            position.x += deltaX * 0.5;
            position.y += deltaY * 0.5;
            
            updateLetterTransform(letter, position);
            lastPosition = { x: e.clientX, y: e.clientY };
        }
        
        function onRelease() {
            isDragging = false;
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', onRelease);
            updatePhysics();
        }
    });
}

function checkCollisions(currentLetter, currentIndex, position) {
    const letters = document.querySelectorAll('.spring-letter.installed');
    const containerRect = currentLetter.parentElement.getBoundingClientRect();
    
    letters.forEach((otherLetter, otherIndex) => {
        if (otherIndex === currentIndex) return;
        
        const otherRect = otherLetter.parentElement.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(containerRect.left - otherRect.left, 2) + 
            Math.pow(containerRect.top - otherRect.top, 2)
        );
        
        // If collision detected, apply repulsion
        if (distance < 120) {
            const force = (120 - distance) * 0.002;
            const angle = Math.atan2(
                containerRect.top - otherRect.top,
                containerRect.left - otherRect.left
            );
            
            position.x += Math.cos(angle) * force;
            position.y += Math.sin(angle) * force;
        }
    });
}

function updateLetterTransform(letter, position) {
    const string = letter.parentElement.querySelector('.spring-string path');
    const rotation = position.x * 0.1;
    
    letter.style.transform = `translateX(${position.x}px) translateY(${position.y}px) rotate(${rotation}deg)`;
    
    // Update string physics
    if (string) {
        const stretch = position.y * 0.4;
        const sway = position.x * 0.3;
        const points = [];
        
        for (let i = 0; i <= 8; i++) {
            const t = i / 8;
            const baseY = t * (240 + stretch);
            const swayX = 4 + sway * (1 - t) + Math.sin(t * Math.PI * 2) * (stretch * 0.01);
            points.push(`${i === 0 ? 'M' : 'L'}${swayX} ${baseY}`);
        }
        
        string.setAttribute('d', points.join(' '));
        
        // Enhanced tension effects
        const tension = Math.min(1, Math.sqrt(position.x * position.x + position.y * position.y) / 100);
        const red = Math.floor(44 + tension * 100);
        const green = Math.floor(62 + tension * 60);
        const blue = Math.floor(80 + tension * 40);
        string.setAttribute('stroke', `rgb(${red}, ${green}, ${blue})`);
        
        if (tension > 0.3) {
            string.setAttribute('filter', `drop-shadow(0 0 ${tension * 12}px rgb(${red}, ${green}, ${blue}))`);
        }
    }
}

// ============================================
// 🌌 SPACE COMMAND CENTER INTEGRATION
// ============================================

function createCommandCenterParticles() {
    const storyboardSection = document.querySelector('.storyboard-section');
    if (!storyboardSection) return;
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'command-center-particles';
    storyboardSection.appendChild(particleContainer);
    
    // Generate floating command particles
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createCommandParticle(particleContainer);
        }, i * 200);
    }
    
    // Continue creating particles periodically
    setInterval(() => {
        if (particleContainer.children.length < 50) {
            createCommandParticle(particleContainer);
        }
    }, 1000);
}

function createCommandParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'command-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 12 + 's';
    particle.style.animationDuration = (8 + Math.random() * 8) + 's';
    
    // Random size variation
    const size = 1 + Math.random() * 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 16000);
}
