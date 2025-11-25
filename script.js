// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });
}

// Close nav when clicking a link (mobile)
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");

if (lightbox && lightboxImg && lightboxCaption) {
  document.querySelectorAll(".gallery-card img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "";
      const fig = img.closest("figure");
      const cap = fig ? fig.querySelector("figcaption") : null;
      lightboxCaption.textContent = cap ? cap.textContent : "";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target.dataset.lightboxClose !== undefined || e.target === lightbox) {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
      lightboxCaption.textContent = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
      lightboxCaption.textContent = "";
    }
  });
}
