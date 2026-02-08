const video = document.querySelector(".hero-video");

window.addEventListener("load", () => {
  video.play().catch(() => {
    // Safari a veces necesita interacción
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Nombre de empresa
  document.querySelectorAll("[data-company]").forEach(el => {
    el.textContent = SITE_CONFIG.companyName;
  });

  // Año
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = SITE_CONFIG.year;
  });

  // Boton contacto
document.getElementById("btn-contact")?.addEventListener("click", () => {
  window.location.href = `mailto:${SITE_CONFIG.email}`;
  });

  // Head website 
  document.querySelectorAll("[data-headName]").forEach(el => {
    el.textContent = SITE_CONFIG.headerName;
  });




});


