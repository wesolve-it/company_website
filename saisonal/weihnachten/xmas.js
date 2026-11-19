// Weihnachts-Modal – im Januar zusammen mit dem <dialog id="xmas-modal"> in index.html entfernen.
// Erscheint einmal pro Browser-Sitzung nach kurzer Zeit, aber erst wenn der Cookie-Banner zu ist.
(function () {
  "use strict";

  // Hier die echten Daten eintragen (Monat ist 0-basiert: 11 = Dezember, 0 = Januar).
  var LAST_DAY = new Date(2026, 11, 23);
  var BACK_DAY = new Date(2027, 0, 2);
  var SHOW_UNTIL = BACK_DAY; // ab diesem Tag erscheint das Modal nicht mehr
  var DELAY_MS = 4000;
  var KEY = "xmas-modal-seen";

  var dialog = document.getElementById("xmas-modal");
  if (!dialog || typeof dialog.showModal !== "function") return;

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  if (today >= SHOW_UNTIL) return;

  try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}

  var countdown = dialog.querySelector("[data-xmas-countdown]");
  var days = Math.round((LAST_DAY - today) / 864e5);
  if (countdown) {
    if (days > 1) countdown.textContent = "Noch " + days + " Tage sind wir vor der Weihnachtspause für euch da.";
    else if (days === 1) countdown.textContent = "Nur noch morgen sind wir vor der Weihnachtspause für euch da.";
    else if (days === 0) countdown.textContent = "Heute ist unser letzter Tag vor der Weihnachtspause.";
    else countdown.textContent = "Wir sind gerade in der Weihnachtspause – ab 2. Januar sind wir wieder für euch da.";
  }

  function cookieBannerOpen() {
    return document.documentElement.classList.contains("show--consent") ||
      document.documentElement.classList.contains("show--preferences");
  }

  function open() {
    if (dialog.open) return;
    if (cookieBannerOpen()) { setTimeout(open, 1000); return; }
    try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
    dialog.showModal();
  }

  // Klick auf den abgedunkelten Hintergrund schließt das Modal.
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close();
  });

  setTimeout(open, DELAY_MS);
})();
