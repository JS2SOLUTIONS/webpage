document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("[data-link]");

    buttons.forEach(btn => {
        const key = btn.dataset.link;

        if (SITE_CONFIG[key]) {
            btn.href = SITE_CONFIG[key];
        } else {
            console.warn(`No existe configuración para: ${key}`);
        }
    });
});
