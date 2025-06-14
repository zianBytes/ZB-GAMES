// Game state
let gameInitialized = false;

// Basic game setup
function initializeGame() {
    console.log('=== Initializing Game ===');
    
    if (gameInitialized) {
        console.log('Game already initialized, skipping');
        return;
    }

    const gameSection = document.getElementById('gameSection');
    const gameContainer = document.getElementById('gameContainer');
    
    if (!gameContainer) {
        console.error('Game container not found');
        return;
    }
    
    console.log('Game container found:', gameContainer);

    // Prevent scrolling when game is active
    document.body.style.overflow = 'hidden';
    
    // Prevent arrow keys from scrolling the page
    window.addEventListener('keydown', function(e) {
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    // Create and configure the iframe
    const gameFrame = document.createElement('iframe');
    gameFrame.src = 'game/toby-meowstronaut/index.html';
    gameFrame.style.width = '100%';
    gameFrame.style.height = '100%';
    gameFrame.style.border = 'none';
    gameFrame.style.background = '#000';
    
    // Clear the container and add the iframe
    gameContainer.innerHTML = '';
    gameContainer.appendChild(gameFrame);

    // Show game section
    gameSection.style.display = 'block';
    
    gameInitialized = true;
    console.log('Game initialized successfully');
}

function cleanupGame() {
    console.log('=== Cleaning up Game ===');
    
    const gameSection = document.getElementById('gameSection');
    const gameContainer = document.getElementById('gameContainer');
    
    // Hide game section
    gameSection.style.display = 'none';
    
    // Re-enable scrolling
    document.body.style.overflow = '';
    
    // Stop any game audio and remove the iframe
    const gameIframe = gameContainer.querySelector('iframe');
    if (gameIframe) {
        // First, try to stop any audio
        try {
            gameIframe.contentWindow.postMessage('stop', '*');
        } catch (e) {
            console.log('Could not send stop message to iframe');
        }
        
        // Remove the iframe completely
        gameIframe.remove();
    }
    
    // Show the games section
    document.getElementById('gamesSection').style.display = 'block';
    
    gameInitialized = false;
}

// Add event listener for the back button
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', cleanupGame);
    }
});

// Log that the script has loaded
console.log('Game script loaded'); 