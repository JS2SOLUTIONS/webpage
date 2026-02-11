document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".service-hero");
  const dots = document.querySelectorAll(".vertical-nav .dot");

  if (!sections.length || !dots.length) return;

  const observerOptions = {
    root: null,
    threshold: 0.6
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const index = Array.from(sections).indexOf(entry.target);

      dots.forEach(dot => dot.classList.remove("active"));
      if (dots[index]) {
        dots[index].classList.add("active");
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
dots.forEach(dot => {
  dot.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = dot.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});
