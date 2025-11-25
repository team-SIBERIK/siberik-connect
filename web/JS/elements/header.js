class SCHeader {
    constructor() {
        this.nav = document.getElementById("sc-nav");
        this.toggle = document.getElementById("sc-nav-toggle");
        this.bindEvents();
    }

    bindEvents() {
        if (!this.nav || !this.toggle) return;

        this.toggle.addEventListener("click", () => {
            const isOpen = this.nav.classList.toggle("sc-nav--open");
            this.toggle.classList.toggle("sc-nav-toggle--open", isOpen);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                this.nav.classList.remove("sc-nav--open");
                this.toggle.classList.remove("sc-nav-toggle--open");
            }
        });

        document.addEventListener("click", evt => {
            if (!this.nav.contains(evt.target) && !this.toggle.contains(evt.target)) {
                this.nav.classList.remove("sc-nav--open");
                this.toggle.classList.remove("sc-nav-toggle--open");
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new SCHeader();
});