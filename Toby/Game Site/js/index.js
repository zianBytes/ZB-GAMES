// Debug function to check if elements exist
function checkElements() {
    console.log('=== Element Check ===');
    const elements = {
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOM Loaded ===');
    checkElements();

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
            var timeline = document.querySelector('.storyboard-section');
            if (timeline && timeline.scrollIntoView) {
                timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (timeline) {
                var top = timeline.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
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
});
