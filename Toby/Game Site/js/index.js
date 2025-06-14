// Debug function to check if elements exist
function checkElements() {
    console.log('=== Element Check ===');
    const elements = {
        playBtn: document.getElementById('playBtn'),
        backBtn: document.getElementById('backBtn'),
        gamesContainer: document.querySelector('.games-container'),
        gameContainer: document.getElementById('gameContainer'),
        gameCanvas: document.getElementById('gameCanvas')
    };

    Object.entries(elements).forEach(([name, element]) => {
        console.log(`${name}:`, element ? 'Found' : 'Not Found');
        if (element) {
            console.log(`${name} styles:`, {
                display: element.style.display,
                visibility: element.style.visibility,
                opacity: element.style.opacity
            });
        }
    });
}

// Function to start the game
function startGame() {
    console.log('=== Starting Game ===');
    const gamesContainer = document.querySelector('.games-container');
    const gameContainer = document.getElementById('gameContainer');
    
    console.log('Games Container:', gamesContainer);
    console.log('Game Container:', gameContainer);
    
    if (gamesContainer && gameContainer) {
        console.log('Current display states:');
        console.log('Games Container display:', gamesContainer.style.display);
        console.log('Game Container display:', gameContainer.style.display);
        
        console.log('Hiding games container');
        gamesContainer.style.display = 'none';
        
        console.log('Showing game container');
        gameContainer.style.display = 'block';
        
        console.log('New display states:');
        console.log('Games Container display:', gamesContainer.style.display);
        console.log('Game Container display:', gameContainer.style.display);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Game started successfully');
    } else {
        console.error('Required elements not found');
        if (!gamesContainer) console.error('Games container not found');
        if (!gameContainer) console.error('Game container not found');
    }
}

// Function to return to games
function returnToGames() {
    console.log('=== Returning to Games ===');
    const gamesContainer = document.querySelector('.games-container');
    const gameContainer = document.getElementById('gameContainer');
    
    console.log('Games Container:', gamesContainer);
    console.log('Game Container:', gameContainer);
    
    if (gamesContainer && gameContainer) {
        console.log('Current display states:');
        console.log('Games Container display:', gamesContainer.style.display);
        console.log('Game Container display:', gameContainer.style.display);
        
        console.log('Hiding game container');
        gameContainer.style.display = 'none';
        
        console.log('Showing games container');
        gamesContainer.style.display = 'block';
        
        console.log('New display states:');
        console.log('Games Container display:', gamesContainer.style.display);
        console.log('Game Container display:', gameContainer.style.display);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Returned to games successfully');
    } else {
        console.error('Required elements not found');
        if (!gamesContainer) console.error('Games container not found');
        if (!gameContainer) console.error('Game container not found');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM Loaded ===');
    checkElements();

    // Add click handlers for game navigation
    const playBtn = document.getElementById('playBtn');
    const backBtn = document.getElementById('backBtn');

    if (playBtn) {
        console.log('Play button found, adding click listener');
        // Remove any existing listeners
        playBtn.replaceWith(playBtn.cloneNode(true));
        const newPlayBtn = document.getElementById('playBtn');
        newPlayBtn.addEventListener('click', function(e) {
            console.log('Play button clicked');
            e.preventDefault();
            e.stopPropagation();
            startGame();
        });
    } else {
        console.error('Play button not found!');
    }

    if (backBtn) {
        console.log('Back button found, adding click listener');
        // Remove any existing listeners
        backBtn.replaceWith(backBtn.cloneNode(true));
        const newBackBtn = document.getElementById('backBtn');
        newBackBtn.addEventListener('click', function(e) {
            console.log('Back button clicked');
            e.preventDefault();
            e.stopPropagation();
            returnToGames();
        });
    } else {
        console.error('Back button not found!');
    }

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
});
