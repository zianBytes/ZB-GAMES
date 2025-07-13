// Game Management System - Optimized Version
class GameManager {
    constructor() {
        this.currentGame = null;
        this.gameContainer = null;
        this.currentIframe = null;
        console.log('🎮 GameManager constructor called');
        this.setupEventListeners();
        console.log('🎮 GameManager initialized');
    }

    setupEventListeners() {
        console.log('🎮 Setting up event listeners...');
        
        // Single optimized click listener for all game interactions
        document.addEventListener('click', (e) => {
            // Handle play button clicks
            if (e.target.classList.contains('play-button') || 
                e.target.textContent === 'Play' ||
                e.target.closest('.play-button')) {
                
                e.stopPropagation();
                e.preventDefault();
                
                console.log('🎮 Play button clicked!');
                const gameCard = e.target.closest('.game-card') || e.target.closest('.timeline-content');
                if (gameCard) {
                    const gameId = gameCard.dataset.gameId || gameCard.querySelector('[data-game-id]')?.dataset.gameId;
                    const gameName = gameCard.querySelector('h3')?.textContent || 'Unknown Game';
                    console.log('🎮 Game ID:', gameId, 'Game Name:', gameName);
                    
                    if (gameId) {
                        this.startGame(gameId, gameName);
                    }
                }
            }
            
            // Handle back button clicks
            if (e.target.classList.contains('back-button')) {
                console.log('🎮 Back button clicked!');
                this.stopGame();
            }
        });
        
        console.log('🎮 Event listeners set up');
    }

    startGame(gameId, gameName) {
        console.log('🎮 Starting game:', gameId, gameName);
        this.currentGame = { id: gameId, name: gameName };

        // Prevent background scrolling and add game-active class
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.classList.add('game-active');

        // Show game section with proper styling
        const gameSection = document.getElementById('gameSection');
        if (gameSection) {
            gameSection.style.display = 'block';
            gameSection.style.visibility = 'visible';
            gameSection.style.opacity = '1';
            
            // Update game title
            const gameTitle = gameSection.querySelector('.game-title');
            if (gameTitle) {
                gameTitle.textContent = gameName;
            }

            // Load game based on ID
            this.loadGame(gameId);
        }

        // Hide main content
        const gamesContainer = document.querySelector('.games-container');
        const storyboardSection = document.querySelector('.storyboard-section');
        
        if (gamesContainer) gamesContainer.style.display = 'none';
        if (storyboardSection) storyboardSection.style.display = 'none';
    }

    loadGame(gameId) {
        console.log('🎮 Loading game with ID:', gameId);
        const gameContainer = document.getElementById('gameContainer');
        if (!gameContainer) {
            console.log('🎮 Game container not found!');
            return;
        }

        // Clear previous content and stop any existing iframe
        this.stopCurrentIframe();
        gameContainer.innerHTML = '';

        // Ensure game container has proper styling
        gameContainer.style.display = 'flex';
        gameContainer.style.visibility = 'visible';
        gameContainer.style.opacity = '1';
        
        // Force apply the cyan glow styling
        gameContainer.style.border = '2px solid var(--card-border)';
        gameContainer.style.boxShadow = '0 0 20px var(--glow-color), 0 0 40px var(--glow-color)';
        gameContainer.style.borderRadius = '8px';
        gameContainer.style.padding = '1rem';
        gameContainer.style.maxWidth = '95vw';
        gameContainer.style.maxHeight = '90vh';
        gameContainer.style.transition = 'all 0.3s ease';
        gameContainer.style.willChange = 'transform';
        gameContainer.style.backfaceVisibility = 'hidden';
        gameContainer.style.perspective = '1000px';
        gameContainer.style.transformStyle = 'preserve-3d';
        gameContainer.style.contain = 'layout style paint';
        gameContainer.style.isolation = 'isolate';

        switch (gameId) {
            case 'toby-meowstronaut':
                console.log('🎮 Loading Toby game...');
                this.loadTobyGame(gameContainer);
                break;
            case 'ts-pmo':
                console.log('🎮 Loading TS-PMO game...');
                this.loadTsPmoGame(gameContainer);
                break;
            default:
                console.log('🎮 Unknown game ID:', gameId);
                gameContainer.innerHTML = '<p style="color: white; text-align: center;">Game not available yet!</p>';
        }
    }

    loadTobyGame(container) {
        console.log('🎮 Creating iframe for Toby game...');
        
        // Add loading indicator with better styling
        container.innerHTML = `
            <div style="
                color: white; 
                text-align: center; 
                padding: 2rem; 
                font-size: 1.2rem;
                background: rgba(0, 0, 0, 0.8);
                border-radius: 8px;
                border: 1px solid var(--glow-color);
                box-shadow: 0 0 20px var(--glow-color);
            ">
                Loading Toby The Meowstronaut...
            </div>
        `;
        
        // Create iframe for Toby game with enhanced performance optimizations
        const iframe = document.createElement('iframe');
        iframe.src = 'game/toby-meowstronaut/index.html';
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
            background: #000;
            border-radius: 4px;
            /* Enhanced performance optimizations */
            will-change: transform;
            backface-visibility: hidden;
            transform: translateZ(0);
            /* Disable pointer events during loading */
            pointer-events: none;
            /* Additional performance optimizations */
            contain: layout style paint;
            isolation: isolate;
            /* Smooth rendering */
            image-rendering: optimizeSpeed;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
        `;
        
        // Store reference to current iframe
        this.currentIframe = iframe;
        
        // Add iframe with optimized loading and better timing
        setTimeout(() => {
            container.innerHTML = '';
            container.appendChild(iframe);
            
            // Re-enable pointer events after loading with shorter delay
            setTimeout(() => {
                iframe.style.pointerEvents = 'auto';
                console.log('🎮 Iframe pointer events enabled');
            }, 1000);
            
            console.log('🎮 Iframe created and added to container');
        }, 100);
    }

    loadTsPmoGame(container) {
        container.innerHTML = '<p style="color: white; text-align: center;">TS-PMO game coming soon!</p>';
    }

    stopCurrentIframe() {
        if (this.currentIframe) {
            console.log('🎮 Stopping current iframe...');
            // Remove the iframe to stop all audio and processes
            if (this.currentIframe.parentNode) {
                this.currentIframe.parentNode.removeChild(this.currentIframe);
            }
            this.currentIframe = null;
        }
    }

    stopGame() {
        console.log('🎮 Stopping game...');
        
        // Stop the current iframe to prevent background audio
        this.stopCurrentIframe();
        
        // Restore scrolling and remove game-active class
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.classList.remove('game-active');
        
        // Show main content
        const gamesContainer = document.querySelector('.games-container');
        const storyboardSection = document.querySelector('.storyboard-section');
        
        if (gamesContainer) gamesContainer.style.display = 'grid';
        if (storyboardSection) storyboardSection.style.display = 'block';
        
        // Hide game section
        const gameSection = document.getElementById('gameSection');
        if (gameSection) {
            gameSection.style.display = 'none';
        }

        // Clear game state
        this.currentGame = null;
    }
}

// Initialize game manager when DOM is loaded
console.log('🎮 game.js loaded, waiting for DOM...');

// Use a more reliable initialization method
function initializeGameManager() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🎮 DOM loaded, initializing GameManager...');
            window.gameManager = new GameManager();
            console.log('🎮 GameManager created and assigned to window.gameManager');
        });
    } else {
        console.log('🎮 DOM already loaded, initializing GameManager immediately...');
        window.gameManager = new GameManager();
        console.log('🎮 GameManager created and assigned to window.gameManager');
    }
}

initializeGameManager(); 