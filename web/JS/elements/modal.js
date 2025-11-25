class SCModalController {
    constructor() {
        this.backdrops = Array.from(document.querySelectorAll(".sc-modal-backdrop"));
        this.registerEvents();
    }

    registerEvents() {
        document.addEventListener("click", evt => {
            const openTrigger = evt.target.closest("[data-open-modal]");
            if (openTrigger) {
                const selector = openTrigger.getAttribute("data-open-modal");
                const backdrop = document.querySelector(selector);
                if (backdrop) {
                    evt.preventDefault();
                    this.open(backdrop);
                }
            }

            const closeTrigger = evt.target.closest("[data-close-modal]");
            if (closeTrigger) {
                const backdrop = closeTrigger.closest(".sc-modal-backdrop");
                if (backdrop) {
                    evt.preventDefault();
                    this.close(backdrop);
                }
            }

            if (evt.target.classList.contains("sc-modal-backdrop")) {
                this.close(evt.target);
            }
        });

        document.addEventListener("keydown", evt => {
            if (evt.key === "Escape") {
                this.backdrops.forEach(b => this.close(b));
            }
        });
    }

    open(backdrop) {
        backdrop.classList.add("sc-modal-backdrop--open");
        backdrop.setAttribute("aria-hidden", "false");
    }

    close(backdrop) {
        backdrop.classList.remove("sc-modal-backdrop--open");
        backdrop.setAttribute("aria-hidden", "true");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new SCModalController();
});