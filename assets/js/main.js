// ==============================
// MAIN.JS
// ==============================

// Autoplay seguro para el video hero
window.addEventListener("load", () => {
  const video = document.querySelector(".hero-video");
  video?.play().catch(() => {
    // Safari / iOS requiere interacción
  });
});

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------
  // TÍTULO DINÁMICO + TEXTO ESTÁTICO
  // ------------------------------
  const titleTag = document.querySelector("title[data-headName]");
  if (titleTag) {
    const staticText = titleTag.textContent.trim(); // texto que pones en cada HTML
    titleTag.textContent = `${staticText} | ${SITE_CONFIG.headerName}`;
  }

  // ------------------------------
  // HEADER: Logo + nombre empresa
  // ------------------------------
  const headerH1 = document.querySelector("h1[data-company]");
  if (headerH1) {
    headerH1.innerHTML = `<img src="${SITE_CONFIG.logoSrc}" alt="Logo"> ${SITE_CONFIG.companyName}`;
  }

  // ------------------------------
  // FOOTER: Año y empresa
  // ------------------------------
  document.querySelectorAll("footer [data-company]").forEach(el => el.textContent = SITE_CONFIG.companyName);
  document.querySelectorAll("footer [data-year]").forEach(el => el.textContent = SITE_CONFIG.year);

  // ------------------------------
  // BOTÓN CONTACTO
  // ------------------------------
  document.getElementById("btn-contact")?.addEventListener("click", () => {
    window.location.href = `mailto:${SITE_CONFIG.email}`;
  });




});
