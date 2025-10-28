

// ==========================================
//  HERO SEQUENTIAL FADE-IN AND BUTTON CLICK
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const paragraphs = document.querySelectorAll('.hero-paragraph');
    const heroButton = document.querySelector('.hero-btn');
    const heroSection = document.getElementById('hero-section');

    // Sequentially show paragraphs
    paragraphs.forEach((paragraph, index) => {
        setTimeout(() => paragraph.classList.add('show'), index * 2000);
    });

    // Show button after last paragraph
    setTimeout(() => heroButton.classList.add('show'), paragraphs.length * 2000);

    // Button click event
    heroButton.addEventListener('click', event => {
        event.preventDefault();

        // Fade-out hero section
        heroSection.classList.add('fade-out');

        // After fade-out, remove hero section from layout
        setTimeout(() => {
            heroSection.style.display = 'none';

            // Dispatch event for main content
            const heroFinishedEvent = new Event('heroFinished');
            document.dispatchEvent(heroFinishedEvent);
        }, 1000); // match CSS transition
    });
});

