
const intro = document.getElementById("hero-section");
const heroButton = document.querySelector('.hero-btn');
const main = document.getElementById("main-content");
const footer = document.querySelector("footer");
const omitIntro = document.getElementById("omit-intro");

// =============================
// PAGE GENERAL BEHAVIOR
// =============================

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    mainContent.classList.add('hidden');

    document.addEventListener('heroFinished', () => {
        mainContent.classList.remove('hidden');
        mainContent.style.opacity = 0;

        // Fade-in main content
        setTimeout(() => {
            mainContent.style.opacity = 1, 50
        });
    });
});

// Fade out the intro section
function fadeOutIntro(callback) {
    intro.style.opacity = 0;
    setTimeout(() => {
        intro.style.display = "none";
        callback();
    }, 600);
}

// Show the main content section with fade-in effect
function showMainContent(callback) {
    main.style.display = "block";
    setTimeout(() => {
        main.style.opacity = 1;
        if (callback) callback();
            showFooter(); 
    }, 100);
}

// Show the footer with a smooth fade-in
function showFooter() {
    if (footer) {
        footer.style.display = "block";
        footer.style.opacity = 0;
        setTimeout(() => {
            footer.style.transition = "opacity 0.6s";
            footer.style.opacity = 1;
        }, 50);
    }
}

heroButton.addEventListener("click", () => {
    fadeOutIntro(() => showMainContent());
});

omitIntro.addEventListener("click", () => {
    fadeOutIntro(() => showMainContent());
});

window.addEventListener("load", () => {
    if (footer) {
        footer.style.display = "none"; // hide footer initially
    }
});