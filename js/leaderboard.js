class Leaderboard {
    constructor() {
        this.overlay = null;
        this.container = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Create and add leaderboard button to game container
        const gameContainer = document.getElementById('gameContainer');
        if (gameContainer) {
            const leaderboardButton = document.createElement('button');
            leaderboardButton.className = 'leaderboard-button';
            leaderboardButton.innerHTML = '🏆 Leaderboard';
            leaderboardButton.onclick = () => this.showLeaderboard();
            gameContainer.appendChild(leaderboardButton);
        }
    }

    showLeaderboard() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'leaderboard-overlay';
        this.overlay.onclick = (e) => {
            if (e.target === this.overlay) {
                this.hideLeaderboard();
            }
        };

        // Create container
        this.container = document.createElement('div');
        this.container.className = 'leaderboard-container';

        // Create header
        const header = document.createElement('div');
        header.className = 'leaderboard-header';
        header.innerHTML = `
            <h2 class="leaderboard-title">🏆 Leaderboard</h2>
            <button class="leaderboard-close">&times;</button>
        `;
        header.querySelector('.leaderboard-close').onclick = () => this.hideLeaderboard();

        // Create list
        const list = document.createElement('div');
        list.className = 'leaderboard-list';

        // Get and sort scores
        const scores = this.getGameScores();
        scores.sort((a, b) => b.score - a.score);

        // Add scores to list
        if (scores.length === 0) {
            const noScores = document.createElement('div');
            noScores.className = 'leaderboard-item';
            noScores.innerHTML = '<span class="leaderboard-empty">No scores yet. Be the first to play!</span>';
            list.appendChild(noScores);
        } else {
            scores.forEach((score, index) => {
                const item = document.createElement('div');
                item.className = 'leaderboard-item';
                item.innerHTML = `
                    <span class="leaderboard-rank">#${index + 1}</span>
                    <span class="leaderboard-name">${score.playerName}</span>
                    <span class="leaderboard-score">${score.score}</span>
                    <span class="leaderboard-date">${this.formatDate(score.date)}</span>
                `;
                list.appendChild(item);
            });
        }

        // Assemble and show
        this.container.appendChild(header);
        this.container.appendChild(list);
        this.overlay.appendChild(this.container);
        document.body.appendChild(this.overlay);
    }

    hideLeaderboard() {
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
            this.container = null;
        }
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    getGameScores() {
        const scores = JSON.parse(localStorage.getItem('gameScores') || '[]');
        return scores.filter(score => score.gameId === 'toby-meowstronaut');
    }
}

// Initialize leaderboard when the game starts
document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', () => {
            setTimeout(() => {
                const leaderboard = new Leaderboard();
            }, 1000); // Wait for game container to be created
        });
    }
}); 