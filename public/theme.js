// Muss synchron im <head> geladen werden, damit die Seite nicht hell aufblitzt.
(function () {
  function apply(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }

  var stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {}

  apply(stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

  window.toggleTheme = function () {
    var next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    apply(next);
  };
})();
