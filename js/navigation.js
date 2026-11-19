function applyHomeBrand(container) {
  if (!document.body.classList.contains("brand-page")) return;
  const logo = container.querySelector("[data-home-logo]");
  if (logo) logo.src = logo.dataset.homeLogo || "/assets/img/wesolve-tinte-koralle.svg";
}

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.createElement("div");
  fetch("/navigation.html")
  .then(response => response.text())
  .then(html => {
    nav.innerHTML = html;
    applyHomeBrand(nav);
    if (document.body.classList.contains("brand-page")) {
      const currentPath = location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
      nav.querySelectorAll("nav a").forEach(link => {
        if (link.getAttribute("href") === currentPath) link.setAttribute("aria-current", "page");
      });
    }
    document.body.prepend(nav);
  })
  .catch(err => console.error("Navigation konnte nicht geladen werden", err));
})

document.addEventListener("DOMContentLoaded", function() {
  fetch("/footer.html")
    .then(response => response.text())
    .then(data => {
      const footer = document.getElementById("footer-placeholder");
      footer.innerHTML = data;
      applyHomeBrand(footer);
    });
});

// Cookie-Consent-Banner (js/cookie-consent.js) site-weit laden.
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("cookie-consent-loader")) return;
  var script = document.createElement("script");
  script.id = "cookie-consent-loader";
  script.src = "/js/cookie-consent.js";
  document.head.appendChild(script);
});