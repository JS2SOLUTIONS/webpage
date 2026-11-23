document.addEventListener("DOMContentLoaded", () => {
  const C = SITE_CONFIG;
  const links = {
    whatsappLink: `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(C.whatsappMessage)}`,
    emailLink: `mailto:${C.email}`,
    linkedinLink: C.linkedinLink
  };

  // Enlaces de contacto desde config.js
  document.querySelectorAll("[data-link]").forEach(a => { a.href = links[a.dataset.link]; });
  document.querySelectorAll("[data-email]").forEach(el => { el.textContent = C.email; });
  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });

  // Menú móvil
  const header = document.querySelector(".header");
  const toggle = document.querySelector(".menu-toggle");
  toggle?.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open);
  });

  // Dropdown Servicios: hover en escritorio, clic en móvil/teclado
  document.querySelectorAll(".dropdown").forEach(drop => {
    const btn = drop.querySelector(".dropbtn");
    const set = open => { drop.classList.toggle("open", open); btn.setAttribute("aria-expanded", open); };
    const canHover = matchMedia("(hover: hover) and (min-width: 901px)").matches;
    if (canHover) {
      drop.addEventListener("mouseenter", () => set(true));
      drop.addEventListener("mouseleave", () => set(false));
    }
    btn.addEventListener("click", e => { e.stopPropagation(); set(!drop.classList.contains("open")); });
    document.addEventListener("click", () => set(false));
    drop.addEventListener("keydown", e => { if (e.key === "Escape") { set(false); btn.focus(); } });
  });

  // Animación al hacer scroll + resaltar submenú de servicios
  const subLinks = document.querySelectorAll(".subnav a");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));

    if (subLinks.length) {
      const so = new IntersectionObserver(entries => entries.forEach(e => {
        if (!e.isIntersecting) return;
        subLinks.forEach(a => a.classList.toggle("active", a.hash === `#${e.target.id}`));
      }), { rootMargin: "-40% 0px -55% 0px" });
      subLinks.forEach(a => { const s = document.querySelector(a.hash); if (s) so.observe(s); });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
  }

  // Preseleccionar servicio desde /contacto/?servicio=<id>
  const pre = new URLSearchParams(location.search).get("servicio");
  const opt = pre && [...document.querySelectorAll("#contact-form option")].find(o => o.dataset.id === pre);
  if (opt) opt.selected = true;

  // Formulario de contacto: abre el correo del visitante con el mensaje armado (sitio estático, sin servidor)
  document.getElementById("contact-form")?.addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = `Solicitud web: ${f.get("servicio")} - ${f.get("empresa") || f.get("nombre")}`;
    const body = [
      `Nombre: ${f.get("nombre")}`,
      `Empresa: ${f.get("empresa") || "-"}`,
      `Teléfono: ${f.get("telefono") || "-"}`,
      `Servicio: ${f.get("servicio")}`,
      "",
      f.get("mensaje")
    ].join("\n");
    location.href = `mailto:${C.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
