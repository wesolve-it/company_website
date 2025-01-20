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