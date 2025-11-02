// Efecto "scroll reveal" suave para cada párrafo
document.addEventListener("DOMContentLoaded", () => {
    const paragraphs = document.querySelectorAll("#story p");

    const reveal = () => {
        const trigger = window.innerHeight * 0.85;
        paragraphs.forEach(p => {
            const rect = p.getBoundingClientRect();
            if (rect.top < trigger) {
                p.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", reveal);
    reveal();
});
