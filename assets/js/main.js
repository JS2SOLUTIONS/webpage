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
  // TÍTULO DINÁMICO + TEXTO ESTÁTICO HEAD
  // ------------------------------
  const titleTagHead = document.querySelector("title[data-headName]");
  if (titleTagHead) {
    const staticText = titleTagHead.textContent.trim(); // texto que pones en cada HTML
    titleTagHead.textContent = `${staticText} ${SITE_CONFIG.headerName}`;
  }

  // ------------------------------
  // HEADER: Logo + nombre empresa
  // ------------------------------
  const headerH1 = document.querySelector("h1[data-headName]");
  if (headerH1) {
    headerH1.innerHTML = `<a href="index.html"> <img src="${SITE_CONFIG.logoSrc}" alt="Logo" > </a> ${SITE_CONFIG.headerName}`;
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

// ------------------------------
// DROPDOWN SERVICIOS
// ------------------------------

// Detectar dropdowns
document.querySelectorAll(".dropdown").forEach(drop => {

  const btn = drop.querySelector(".dropbtn");
  const menu = drop.querySelector(".dropdown-content");

  // DESKTOP: hover
  drop.addEventListener("mouseenter", () => {
    menu.classList.add("show");
    drop.classList.add("open"); // flecha gira
  });

  drop.addEventListener("mouseleave", () => {
    menu.classList.remove("show");
    drop.classList.remove("open"); // flecha vuelve
  });

  // MÓVIL: click
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isShown = menu.classList.contains("show");
    if (isShown) {
      menu.classList.remove("show");
      drop.classList.remove("open");
    } else {
      menu.classList.add("show");
      drop.classList.add("open");
    }
  });

});

// Cerrar todos los dropdowns al hacer clic fuera
window.addEventListener("click", () => {
  document.querySelectorAll(".dropdown").forEach(drop => {
    drop.classList.remove("open");
    drop.querySelector(".dropdown-content")?.classList.remove("show");
  });
});


// Botón WhatsApp
document.getElementById("btn-whatsapp")?.addEventListener("click", () => {
  const phone = SITE_CONFIG.whatsapp;
  if (phone) {
    // WhatsApp web + mensaje inicial opcional
    const url = `https://wa.me/${phone.replace(/\D/g, '')}`;
    window.open(url, "_blank");
  }
});


// Mostrar sección de certificados al hacer clic en el enlace - about us
function mostrarCertificados() {
  const certSection = document.getElementById('cert-seccion');

  // Mostrar la sección
  certSection.classList.add('active');

  // Hacer scroll suave
  certSection.scrollIntoView({ behavior: 'smooth' });
}



// Cambiar info al hacer clic en imágenes
document.querySelectorAll(".cert-left img").forEach(img => {
  img.addEventListener("click", () => {
    const infoId = img.dataset.info;

    document.querySelectorAll(".cert-left img").forEach(i =>
      i.classList.remove("active")
    );
    img.classList.add("active");

    document.querySelectorAll(".cert-info").forEach(info =>
      info.classList.remove("active")
    );
    document.getElementById(infoId).classList.add("active");
  });
});


