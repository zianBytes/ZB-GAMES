// Game Management System
class GameManager {
    constructor() {
        this.currentGame = null;
        this.currentPlayer = null;
        this.gameContainer = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for play button clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('play-button')) {
                const gameCard = e.target.closest('.game-card');
                if (gameCard) {
                    const gameId = gameCard.dataset.gameId;
                    const gameName = gameCard.querySelector('h3')?.textContent || 'Unknown Game';
                    this.startGame(gameId, gameName);
                }
            }
        });

        // Listen for back button clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('back-button')) {
                this.stopGame();
            }
        });
    }

    async startGame(gameId, gameName) {
        // Show name prompt
        const playerName = await this.showNamePrompt();
        if (!playerName) return; // User cancelled

        this.currentPlayer = playerName;
        this.currentGame = { id: gameId, name: gameName };

        // Show game section
        const gameSection = document.getElementById('gameSection');
        if (gameSection) {
            gameSection.style.display = 'block';
            
            // Update game title
            const gameTitle = gameSection.querySelector('.game-title');
            if (gameTitle) {
                gameTitle.textContent = gameName;
            }

            // Load game based on ID
            this.loadGame(gameId);
        }

        // Hide main content
        document.querySelector('.games-container').style.display = 'none';
        document.querySelector('.storyboard-section').style.display = 'none';
    }

    async showNamePrompt() {
        return new Promise((resolve) => {
            // Create prompt overlay
            const overlay = document.createElement('div');
            overlay.className = 'game-entry-prompt-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
            `;

            // Create prompt container
            const container = document.createElement('div');
            container.className = 'game-entry-prompt';
            container.style.cssText = `
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                padding: 2rem;
                border-radius: 15px;
                border: 2px solid #00ffff;
                box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
                text-align: center;
                max-width: 400px;
                width: 90%;
            `;

            container.innerHTML = `
                <h2 style="color: #00ffff; margin-bottom: 1.5rem; font-family: 'Orbitron', monospace;">
                    What's your name, Meowchacho?
                </h2>
                <input type="text" id="playerNameInput" placeholder="Enter your name..." 
                       style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; 
                              background: rgba(255, 255, 255, 0.1); border: 2px solid #00ffff; 
                              border-radius: 8px; color: white; font-size: 1rem;">
                <div style="display: flex; gap: 1rem;">
                    <button id="startGameBtn" style="flex: 1; padding: 0.8rem; background: #00ffff; 
                            color: black; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                        Start Game
                    </button>
                    <button id="cancelBtn" style="flex: 1; padding: 0.8rem; background: transparent; 
                            color: #00ffff; border: 2px solid #00ffff; border-radius: 8px; cursor: pointer;">
                        Cancel
                    </button>
                </div>
            `;

            overlay.appendChild(container);
            document.body.appendChild(overlay);

            // Focus on input
            const input = container.querySelector('#playerNameInput');
            input.focus();

            // Handle input validation
            input.addEventListener('input', (e) => {
                const isValid = e.target.value.trim().length > 0;
                const startBtn = container.querySelector('#startGameBtn');
                startBtn.disabled = !isValid;
                startBtn.style.opacity = isValid ? '1' : '0.5';
            });

            // Handle start button
            container.querySelector('#startGameBtn').addEventListener('click', () => {
                const name = input.value.trim();
                if (name) {
                    overlay.remove();
                    resolve(name);
                }
            });

            // Handle cancel button
            container.querySelector('#cancelBtn').addEventListener('click', () => {
                overlay.remove();
                resolve(null);
            });

            // Handle Enter key
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const name = input.value.trim();
                    if (name) {
                        overlay.remove();
                        resolve(name);
                    }
                }
            });

            // Handle Escape key
            document.addEventListener('keydown', function escapeHandler(e) {
                if (e.key === 'Escape') {
                    overlay.remove();
                    document.removeEventListener('keydown', escapeHandler);
                    resolve(null);
                }
            });
        });
    }

    loadGame(gameId) {
        const gameContainer = document.getElementById('gameContainer');
        if (!gameContainer) return;

        // Clear previous content
        gameContainer.innerHTML = '';

        switch (gameId) {
            case 'toby-meowstronaut':
                this.loadTobyGame(gameContainer);
                break;
            case 'ts-pmo':
                this.loadTsPmoGame(gameContainer);
                break;
            default:
                gameContainer.innerHTML = '<p style="color: white; text-align: center;">Game not available yet!</p>';
        }
    }

    loadTobyGame(container) {
        // Create iframe for Toby game
        const iframe = document.createElement('iframe');
        iframe.src = 'game/toby-meowstronaut/index.html';
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
            background: #000;
        `;
        container.appendChild(iframe);

        // Listen for game messages (score updates)
        window.addEventListener('message', (event) => {
            if (event.origin !== window.location.origin) return;
            
            if (event.data.type === 'GAME_SCORE') {
                this.handleGameScore(event.data.score);
            }
        });
    }

    loadTsPmoGame(container) {
        container.innerHTML = `
            <div style="color: white; text-align: center; padding: 2rem;">
                <h2>🚧 Coming Soon! 🚧</h2>
                <p>This game is still in development.</p>
            </div>
        `;
    }

    async handleGameScore(score) {
        if (!this.currentPlayer || !this.currentGame) return;

        console.log(`Player ${this.currentPlayer} scored ${score} in ${this.currentGame.name}`);

        // Save score to leaderboard
        if (window.leaderboardManager && window.leaderboardManager.isInitialized) {
            try {
                await window.leaderboardManager.saveScore(this.currentPlayer, score, this.currentGame.name);
                
                // Show score result
                this.showScoreResult(score);
            } catch (error) {
                console.error('Failed to save score:', error);
                this.showScoreResult(score, false);
            }
        } else {
            this.showScoreResult(score, false);
        }
    }

    showScoreResult(score, saved = true) {
        const overlay = document.createElement('div');
        overlay.className = 'score-result-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        `;

        const container = document.createElement('div');
        container.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            padding: 2rem;
            border-radius: 15px;
            border: 2px solid #00ffff;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
            text-align: center;
            max-width: 500px;
            width: 90%;
        `;

        const isNewRecord = window.leaderboardManager?.isNewRecord(score) || false;
        const qualifies = window.leaderboardManager?.qualifiesForLeaderboard(score) || false;

        container.innerHTML = `
            <h2 style="color: #00ffff; margin-bottom: 1rem; font-family: 'Orbitron', monospace;">
                ${isNewRecord ? '🏆 NEW RECORD! 🏆' : 'Game Over!'}
            </h2>
            <p style="color: white; font-size: 1.2rem; margin-bottom: 0.5rem;">
                Player: <span style="color: #00ffff;">${this.currentPlayer}</span>
            </p>
            <p style="color: white; font-size: 1.5rem; margin-bottom: 1.5rem;">
                Score: <span style="color: #00ffff; font-weight: bold;">${score}</span>
            </p>
            ${saved ? `
                <p style="color: #00ff00; margin-bottom: 1rem;">
                    ✅ Score saved to leaderboard!
                </p>
            ` : `
                <p style="color: #ffaa00; margin-bottom: 1rem;">
                    ⚠️ Score saved locally only
                </p>
            `}
            ${qualifies ? `
                <p style="color: #00ff00; margin-bottom: 1rem;">
                    🎉 You made it to the leaderboard!
                </p>
            ` : ''}
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button id="viewLeaderboardBtn" style="padding: 0.8rem 1.5rem; background: #00ffff; 
                        color: black; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                    View Leaderboard
                </button>
                <button id="playAgainBtn" style="padding: 0.8rem 1.5rem; background: transparent; 
                        color: #00ffff; border: 2px solid #00ffff; border-radius: 8px; cursor: pointer;">
                    Play Again
                </button>
            </div>
        `;

        overlay.appendChild(container);
        document.body.appendChild(overlay);

        // Handle button clicks
        container.querySelector('#viewLeaderboardBtn').addEventListener('click', () => {
            overlay.remove();
            this.showLeaderboard();
        });

        container.querySelector('#playAgainBtn').addEventListener('click', () => {
            overlay.remove();
            this.restartGame();
        });

        // Auto-close after 10 seconds
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.remove();
            }
        }, 10000);
    }

    showLeaderboard() {
        if (!window.leaderboardManager) return;

        const overlay = document.createElement('div');
        overlay.className = 'leaderboard-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        `;

        const container = document.createElement('div');
        container.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            padding: 2rem;
            border-radius: 15px;
            border: 2px solid #00ffff;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;

        const scores = window.leaderboardManager.getTopScores(10);
        
        container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="color: #00ffff; font-family: 'Orbitron', monospace; margin: 0;">
                    🏆 Leaderboard
                </h2>
                <button id="closeLeaderboardBtn" style="background: none; border: none; color: #00ffff; 
                        font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            ${scores.length === 0 ? `
                <p style="color: white; text-align: center; font-style: italic;">
                    No scores yet. Be the first to play!
                </p>
            ` : `
                <div style="display: grid; gap: 0.5rem;">
                    ${scores.map((score, index) => `
                        <div style="display: grid; grid-template-columns: 50px 1fr 100px 120px; 
                                    align-items: center; padding: 0.8rem; background: rgba(255, 255, 255, 0.05); 
                                    border-radius: 8px; border: 1px solid rgba(0, 255, 255, 0.1);">
                            <span style="color: #00ffff; font-weight: bold; font-size: 1.1rem;">
                                #${index + 1}
                            </span>
                            <span style="color: white; font-weight: 500;">
                                ${score.name}
                            </span>
                            <span style="color: #00ffff; font-weight: bold;">
                                ${score.score}
                            </span>
                            <span style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">
                                ${window.leaderboardManager.formatDate(score.date)}
                            </span>
                        </div>
                    `).join('')}
                </div>
            `}
        `;

        overlay.appendChild(container);
        document.body.appendChild(overlay);

        // Handle close button
        container.querySelector('#closeLeaderboardBtn').addEventListener('click', () => {
            overlay.remove();
        });

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    restartGame() {
        if (this.currentGame) {
            this.loadGame(this.currentGame.id);
        }
    }

    stopGame() {
        // Hide game section
        const gameSection = document.getElementById('gameSection');
        if (gameSection) {
            gameSection.style.display = 'none';
        }

        // Show main content
        document.querySelector('.games-container').style.display = 'block';
        document.querySelector('.storyboard-section').style.display = 'block';

        // Clear current game
        this.currentGame = null;
        this.currentPlayer = null;
    }
}

// Initialize game manager
document.addEventListener('DOMContentLoaded', function() {
    window.gameManager = new GameManager();
}); 