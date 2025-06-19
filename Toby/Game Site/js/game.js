// Game state
let gameInitialized = false;
let leaderboard;

// Basic game setup
function initializeGame() {
    if (!gameInitialized) {
        authManager.showGameEntryPrompt();
    }
}

window.startGame = function() {
    if (gameInitialized) return;
    
    // Track game start
    analytics.trackGameStart('toby-meowstronaut');
    
    const gameContainer = document.getElementById('gameContainer');
    const gameSection = document.getElementById('gameSection');
    const gamesSection = document.getElementById('gamesSection');
    const mainContent = document.querySelector('main');
    
    // Hide main content
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    
    // Create and configure the game iframe
    const iframe = document.createElement('iframe');
    iframe.src = 'game/toby-meowstronaut/index.html';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = 'none';
    iframe.allow = 'fullscreen';
    
    // Clear any existing content and add the iframe
    gameContainer.innerHTML = '';
    gameContainer.appendChild(iframe);
    
    // Show the game section and hide the games section
    gameSection.style.display = 'block';
    gamesSection.style.display = 'none';
    
    // Initialize leaderboard
    leaderboard = new Leaderboard();
    
    // Prevent scrolling when game is active
    document.body.style.overflow = 'hidden';
    
    // Add event listener for arrow keys to prevent scrolling
    document.addEventListener('keydown', function(e) {
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }
    });
    
    // Set game as initialized
    gameInitialized = true;
}

function cleanupGame() {
    if (!gameInitialized) return;
    
    // Track game end
    analytics.trackGameEnd('toby-meowstronaut', 0);
    
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
    
    // Stop any game audio and remove the iframe
    const iframe = document.querySelector('#gameContainer iframe');
    if (iframe) {
        try {
            // First try to stop any audio by sending a message to the iframe
            iframe.contentWindow.postMessage('stop', '*');
            
            // Then set src to about:blank to stop any ongoing processes
            iframe.src = 'about:blank';
            
            // Finally remove the iframe
            iframe.remove();
        } catch (error) {
            console.error('Error cleaning up game:', error);
        }
    }
    
    // Clean up leaderboard
    if (leaderboard) {
        leaderboard.hideLeaderboard();
    }
    
    // Reset game state
    gameInitialized = false;
}

window.returnToHome = function() {
    cleanupGame();
    const gameSection = document.getElementById('gameSection');
    const gamesSection = document.getElementById('gamesSection');
    const mainContent = document.querySelector('main');
    
    if (gameSection && gamesSection) {
        gameSection.style.display = 'none';
        gamesSection.style.display = 'block';
        if (mainContent) {
            mainContent.style.display = 'block';
        }
    }
}

// Initialize back button functionality
document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.onclick = window.returnToHome;
    }
});

// Add event listeners for auth navigation
document.getElementById('showSignup')?.addEventListener('click', () => {
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('signupContainer').style.display = 'flex';
});

document.getElementById('backToLogin')?.addEventListener('click', () => {
    document.getElementById('signupContainer').style.display = 'none';
    document.getElementById('authContainer').style.display = 'flex';
});

// Log that the script has loaded
console.log('Game script loaded'); 