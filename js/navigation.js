document.addEventListener("DOMContentLoaded", () => {
  const nav = document.createElement("div");
  fetch("../navigation.html")
  .then(response => response.text())
  .then(html => {
    nav.innerHTML = html;
    document.body.prepend(nav);
  })
  .catch(err => console.error("Navigation konnte nicht geladen werden", err));
})

document.addEventListener("DOMContentLoaded", function() {
  fetch("../footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
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