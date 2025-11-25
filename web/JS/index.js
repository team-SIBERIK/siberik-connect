class SectionHighlighter {
    constructor() {
        this.sections = Array.from(document.querySelectorAll(".sc-section"));
        this.navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));

        if (!this.sections.length) return;

        const observer = new IntersectionObserver(
            entries => this.handleIntersect(entries),
            { threshold: 0.35 }
        );

        this.sections.forEach(section => observer.observe(section));

        window.addEventListener("load", () => {
            const hero = document.querySelector("#hero");
            if (hero) hero.classList.add("sc-section--visible");
        });
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            const id = entry.target.getAttribute("id");

            if (entry.isIntersecting) {
                entry.target.classList.add("sc-section--visible");
                this.markNavActive(id);
            }
        });
    }

    markNavActive(id) {
        this.navLinks.forEach(link => {
            const href = link.getAttribute("href") || "";
            const targetId = href.startsWith("#") ? href.slice(1) : null;
            const active = targetId === id;
            link.classList.toggle("sc-nav-link--active", active);
        });
    }
}

class SmoothScrollController {
    constructor() {
        document.addEventListener("click", evt => {
            const trigger = evt.target.closest("[data-scroll-to]");
            if (!trigger) return;

            const targetSelector = trigger.getAttribute("data-scroll-to");
            const target = document.querySelector(targetSelector);
            if (!target) return;

            evt.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        });
    }
}


class HeroOverlayController {
    constructor() {
        this.hero = document.getElementById("hero-overlay");
        this.discoverBtn = document.querySelector("[data-hero-discover]");
        this.main = document.querySelector("main.sc-main");

        if (!this.hero || !this.discoverBtn || !this.main) return;

        this.discoverBtn.addEventListener("click", () => {
            this.hideHero();
        });
    }

    hideHero() {
        // Añadir clase para fade out
        this.hero.classList.add("sc-hero-hidden");

        // Mostrar contenido después del fade
        setTimeout(() => {
            this.main.style.display = "block";
            this.main.style.opacity = "0";

            // pequeño delay para activar el fade-in con CSS
            requestAnimationFrame(() => {
                this.main.style.transition = "opacity 1s ease";
                this.main.style.opacity = "1";
            });
        }, 900); // coincide con el fade del hero
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new SectionHighlighter();
    new SmoothScrollController();
    new HeroOverlayController();
});
