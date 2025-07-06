class AuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('gameUsers')) || {};
        this.currentUser = null;
        this.setupEventListeners();
        // Show main content by default, only show auth when playing games
        this.showGameSection();
        this.hideAuthForms();
    }

    setupEventListeners() {
        // Login form
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Signup form
        document.getElementById('signupForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });

        // Guest button
        document.getElementById('guestButton')?.addEventListener('click', () => {
            this.handleGuestAccess();
        });

        // Toggle between login and signup
        document.getElementById('showSignup')?.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('signupForm').style.display = 'block';
        });

        document.getElementById('showLogin')?.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('signupForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        });
    }

    handleLogin() {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        if (this.users[username] && this.users[username].password === password) {
            this.currentUser = username;
            this.hideAuthForms();
            this.showGameSection();
        } else {
            alert('Invalid username or password');
        }
    }

    handleSignup() {
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;

        if (this.users[username]) {
            alert('Username already exists');
            return;
        }

        this.users[username] = {
            password,
            scores: {}
        };
        localStorage.setItem('gameUsers', JSON.stringify(this.users));
        this.currentUser = username;
        this.hideAuthForms();
        this.showGameSection();
    }

    handleGuestAccess() {
        this.currentUser = null;
        this.hideAuthForms();
        this.showGameSection();
    }

    validatePlayerName(name) {
        const input = document.getElementById('playerNameInput');
        const message = document.getElementById('nameValidationMessage');
        
        if (!name) {
            input.classList.remove('valid', 'invalid');
            message.textContent = '';
            return;
        }

        if (this.users[name]) {
            input.classList.add('invalid');
            input.classList.remove('valid');
            message.textContent = 'This name is already taken';
            message.classList.remove('valid');
        } else {
            input.classList.add('valid');
            input.classList.remove('invalid');
            message.textContent = 'Name is available!';
            message.classList.add('valid');
        }
    }

    saveGameScore(gameId, score) {
        if (this.currentUser) {
            if (!this.users[this.currentUser].scores[gameId]) {
                this.users[this.currentUser].scores[gameId] = [];
            }
            this.users[this.currentUser].scores[gameId].push({
                score,
                date: new Date().toISOString()
            });
            localStorage.setItem('gameUsers', JSON.stringify(this.users));
        }
    }

    getGameScores(gameId) {
        if (this.currentUser && this.users[this.currentUser].scores[gameId]) {
            return this.users[this.currentUser].scores[gameId];
        }
        return [];
    }

    hideAuthForms() {
        document.getElementById('authContainer').style.display = 'none';
    }

    showGameSection() {
        document.getElementById('gamesSection').style.display = 'block';
    }

    showGameEntryPrompt() {
        const prompt = document.createElement('div');
        prompt.className = 'auth-container';
        prompt.innerHTML = `
            <div class="auth-box">
                <h2 class="auth-title">What's your name Meowchacho?</h2>
                <form id="gameEntryForm" class="auth-form">
                    <input type="text" id="playerNameInput" class="auth-input" placeholder="Enter your space name" required>
                    <div id="nameValidationMessage" class="validation-message"></div>
                    <button type="submit" class="auth-button">Launch into Space!</button>
                </form>
            </div>
        `;
        document.body.appendChild(prompt);

        // Add input event listener for name validation
        const nameInput = prompt.querySelector('#playerNameInput');
        nameInput.addEventListener('input', (e) => {
            this.validatePlayerName(e.target.value);
        });

        // Add form submit event listener
        prompt.querySelector('#gameEntryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = nameInput.value.trim();
            if (name) {
                if (!this.users[name]) {
                    this.users[name] = { scores: {} };
                    localStorage.setItem('gameUsers', JSON.stringify(this.users));
                }
                this.currentUser = name;
                prompt.remove();
                // Call startGame again now that user is authenticated
                startGame();
            }
        });
    }
}

// Initialize auth manager
const authManager = new AuthManager(); 