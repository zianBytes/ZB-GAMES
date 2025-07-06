class Analytics {
    constructor() {
        this.userActivity = {
            lastLogin: null,
            totalPlayTime: 0,
            gamesPlayed: 0,
            highScores: {},
            achievements: [],
            sessionStart: new Date(),
            pageViews: 0
        };
        this.initializeAnalytics();
    }

    initializeAnalytics() {
        // Load existing analytics data
        const savedData = localStorage.getItem('userAnalytics');
        if (savedData) {
            this.userActivity = JSON.parse(savedData);
        }

        // Track page views
        this.trackPageView();

        // Set up periodic saving
        setInterval(() => this.saveAnalytics(), 60000); // Save every minute
    }

    trackPageView() {
        this.userActivity.pageViews++;
        this.saveAnalytics();
    }

    trackGameStart(gameId) {
        this.userActivity.gamesPlayed++;
        this.userActivity.lastGamePlayed = {
            gameId,
            timestamp: new Date().toISOString()
        };
        this.saveAnalytics();
    }

    trackGameEnd(gameId, score) {
        if (!this.userActivity.highScores[gameId] || score > this.userActivity.highScores[gameId]) {
            this.userActivity.highScores[gameId] = score;
        }
        this.saveAnalytics();
    }

    trackAchievement(achievement) {
        if (!this.userActivity.achievements.includes(achievement)) {
            this.userActivity.achievements.push(achievement);
            this.saveAnalytics();
        }
    }

    saveAnalytics() {
        localStorage.setItem('userAnalytics', JSON.stringify(this.userActivity));
    }

    getAnalytics() {
        return this.userActivity;
    }
}

// Initialize analytics
const analytics = new Analytics(); 