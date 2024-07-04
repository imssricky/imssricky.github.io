new Vue({
    el: '#app',
    data: {
        message: 'Hello Ricky'
    },
    mounted() {
        gsap.to("#home h1", {duration: 2, y: -20, opacity: 1});
        setupRainEffect();
        setupNavigation();
        setupThemeToggle();
        playIntroAnimation();
        scrollToHome();
        generateBackgroundRaindrops();
    }
});

function setupRainEffect() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('click', function(event) {
            const rect = section.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            createParticleExplosion(section, x, y);
        });
    });
}

function createParticleExplosion(container, x, y) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 100;
        particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
        container.appendChild(particle);

        particle.addEventListener('animationend', function() {
            particle.remove();
        });
    }
}

function createRaindrop(container, x, y) {
    let raindrop = document.createElement('div');
    raindrop.className = 'raindrop';
    raindrop.style.left = `${x}px`;
    raindrop.style.top = `${y}px`;
    raindrop.style.animationDuration = `${Math.random() * 2 + 1}s`; // Random duration between 1s to 3s
    container.appendChild(raindrop);

    raindrop.addEventListener('animationend', function() {
        createSplash(container, x, container.clientHeight);
        raindrop.remove();
    });
}

function createSplash(container, x, y) {
    for (let i = 0; i < 5; i++) {
        let splash = document.createElement('div');
        splash.className = 'splash';
        splash.style.left = `${x + Math.random() * 10 - 5}px`; // Randomize splash position
        splash.style.top = `${y - 5}px`; // Slightly above the bottom
        container.appendChild(splash);

        splash.addEventListener('animationend', function() {
            splash.remove();
        });
    }
}

// Smooth scroll to next section on mouse wheel
let sections = document.querySelectorAll('section');
let currentSectionIndex = 0;

document.addEventListener('wheel', function(event) {
    if (event.deltaY > 0) {
        // Scroll down
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            sections[currentSectionIndex].scrollIntoView({behavior: 'smooth'});
        }
    } else {
        // Scroll up
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            sections[currentSectionIndex].scrollIntoView({behavior: 'smooth'});
        }
    }
});

// Smooth scroll on navigation link click
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({behavior: 'smooth'});
            currentSectionIndex = Array.from(sections).indexOf(targetSection);
        });
    });
}

// Toggle theme between day and night
function setupThemeToggle() {
    const toggleButton = document.getElementById('toggle-theme');
    let isDay = true;

    toggleButton.addEventListener('click', () => {
        if (isDay) {
            document.body.classList.add('night-mode');
            toggleButton.textContent = '🌜';
        } else {
            document.body.classList.remove('night-mode');
            toggleButton.textContent = '🌞';
        }
        isDay = !isDay;
    });
}

// Scroll to home section on page load
function scrollToHome() {
    const homeSection = document.getElementById('home');
    homeSection.scrollIntoView({behavior: 'smooth'});
}

// Play intro animation
function playIntroAnimation() {
    const intro = document.getElementById('intro-animation');
    const video = intro.querySelector('video');

    video.addEventListener('ended', () => {
        gsap.to(intro, {duration: 1, opacity: 0, onComplete: () => {
            intro.style.display = 'none';
        }});
    });
}

// Generate background raindrops
function generateBackgroundRaindrops() {
    const body = document.querySelector('body');

    for (let i = 0; i < 100; i++) {
        let raindropBg = document.createElement('div');
        raindropBg.className = 'raindrop-bg';
        raindropBg.style.left = `${Math.random() * 100}vw`;
        raindropBg.style.top = `${Math.random() * 100}vh`;
        raindropBg.style.animationDuration = `${Math.random() * 3 + 2}s`;
        raindropBg.style.animationDelay = `${Math.random() * 5}s`;
        body.appendChild(raindropBg);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-grid img');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            if (img.classList.contains('expanded')) {
                img.classList.remove('expanded');
            } else {
                galleryImages.forEach(image => image.classList.remove('expanded'));
                img.classList.add('expanded');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const videoItems = document.querySelectorAll('.video-item');

    videoItems.forEach(video => {
        video.addEventListener('click', function() {
            if (video.classList.contains('expanded')) {
                video.classList.remove('expanded');
            } else {
                videoItems.forEach(item => item.classList.remove('expanded'));
                video.classList.add('expanded');
            }
        });
    });
});
