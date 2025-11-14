// JS/theme.js

class ThemeManager {
    constructor() {
        this.themeLink = document.getElementById("theme-stylesheet");
        this.toggleBtn = document.getElementById("theme-toggle");

        this.lightTheme = "/siberik-connect/web/CSS/themes/light.css";
        this.darkTheme = "/siberik-connect/web/CSS/themes/dark.css";

        this.init();
    }

    init() {
        // Load saved theme
        const savedTheme = localStorage.getItem("theme") || "light";
        this.applyTheme(savedTheme);

        // Listen for toggle button click
        this.toggleBtn.addEventListener("click", () => {
            const newTheme = this.isLight() ? "dark" : "light";
            this.applyTheme(newTheme);
        });
    }

    applyTheme(theme) {
        const themePath = theme === "light" ? this.lightTheme : this.darkTheme;
        this.themeLink.href = themePath;

        // Change toggle button icon
        const iconPath = theme === "light" 
            ? "/siberik-connect/web/assets/icons/moon.png" 
            : "/siberik-connect/web/assets/icons/sun.png";

        this.toggleBtn.innerHTML = `<img src="${iconPath}" alt="theme icon" class="theme-icon">`;

        localStorage.setItem("theme", theme);
    }


    isLight() {
        return this.themeLink.href.includes("light.css");
    }
}

document.addEventListener("DOMContentLoaded", () => new ThemeManager());
