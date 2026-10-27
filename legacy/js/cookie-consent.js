// cookie-consent.js — DSGVO/TDDDG-konformer Cookie-Banner (vanilla-cookieconsent v3).
// Wird site-weit über js/navigation.js geladen. Blockiert optionale Analyse-Tools
// (Microsoft Clarity, ABlyft) bis zur aktiven Einwilligung (Opt-in).
// Umami läuft cookielos und ohne Consent, reCAPTCHA (Netlify) ist funktional notwendig.
(function () {
  "use strict";

  var CC_VERSION = "3.1.0";
  var BASE = "/js/vendor/cookieconsent-" + CC_VERSION + "/"; // lokal ausgeliefert, kein Drittanbieter-CDN

  // Stylesheet nur einmal einbinden.
  if (!document.getElementById("cc-style")) {
    var link = document.createElement("link");
    link.id = "cc-style";
    link.rel = "stylesheet";
    link.href = BASE + "cookieconsent.css";
    document.head.appendChild(link);
  }

  // Dark-Mode des Banners mit dem Seiten-Theme synchronisieren, ohne theme.js anzufassen.
  function syncDarkMode() {
    document.documentElement.classList.toggle(
      "cc--darkmode",
      document.documentElement.classList.contains("dark")
    );
  }
  syncDarkMode();
  new MutationObserver(syncDarkMode).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  function init() {
    if (!window.CookieConsent) return;

    CookieConsent.run({
      guiOptions: {
        consentModal: { layout: "box", position: "bottom left", flipButtons: false, equalWeightButtons: true },
        preferencesModal: { layout: "box", position: "right", flipButtons: false, equalWeightButtons: true },
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [
              { name: /^_clck/ },   // Microsoft Clarity
              { name: /^_clsk/ },   // Microsoft Clarity
              { name: /^CLID/ },    // Microsoft Clarity
              { name: /^MUID/ },    // Microsoft Clarity
              { name: /^ablyft/ },  // ABlyft
              { name: /^_ablyft/ }, // ABlyft
            ],
          },
          services: {
            clarity: { label: "Microsoft Clarity" },
            ablyft: { label: "ABlyft (A/B-Testing)" },
          },
        },
      },

      language: {
        default: "de",
        translations: {
          de: {
            consentModal: {
              title: "Wir verwenden Cookies",
              description:
                "Wir setzen Cookies und ähnliche Technologien ein. Notwendige sind für den Betrieb der Website erforderlich. " +
                "Optionale Analyse- und Optimierungstools (Microsoft Clarity, ABlyft) helfen uns, die Seite zu verbessern – " +
                "sie werden ausschließlich mit deiner Einwilligung geladen. Details in unserer " +
                '<a href="/datenschutz.html" class="cc__link">Datenschutzerklärung</a>.',
              acceptAllBtn: "Alle akzeptieren",
              acceptNecessaryBtn: "Ablehnen",
              showPreferencesBtn: "Einstellungen",
              footer:
                '<a href="/datenschutz.html" class="cc__link">Datenschutz</a>' +
                '<a href="/impressum.html" class="cc__link">Impressum</a>',
            },
            preferencesModal: {
              title: "Cookie-Einstellungen",
              acceptAllBtn: "Alle akzeptieren",
              acceptNecessaryBtn: "Alle ablehnen",
              savePreferencesBtn: "Auswahl speichern",
              closeIconLabel: "Schließen",
              serviceCounterLabel: "Dienst(e)",
              sections: [
                {
                  title: "Deine Privatsphäre",
                  description:
                    "Hier kannst du selbst entscheiden, welche Kategorien du zulässt. Deine Auswahl kannst du jederzeit " +
                    'über den Link „Cookie-Einstellungen" im Footer widerrufen oder ändern.',
                },
                {
                  title: "Notwendig",
                  description:
                    "Diese Cookies bzw. Technologien sind für den Betrieb der Website und den Schutz des Kontaktformulars " +
                    "(Spamschutz via reCAPTCHA) erforderlich. Zusätzlich nutzen wir die cookielose Reichweitenmessung Umami, " +
                    "die keine personenbezogenen Daten speichert. Diese Kategorie ist immer aktiv.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analyse & Optimierung",
                  description:
                    "Diese Tools helfen uns zu verstehen, wie Besucher die Website nutzen, um Inhalte und Nutzererlebnis zu " +
                    "verbessern. Sie werden erst nach deiner Einwilligung geladen.",
                  linkedCategory: "analytics",
                  cookieTable: {
                    headers: { name: "Dienst", desc: "Zweck" },
                    body: [
                      {
                        name: "Microsoft Clarity",
                        desc: "Analyse des Nutzerverhaltens (Heatmaps, Session-Aufzeichnungen).",
                      },
                      {
                        name: "ABlyft",
                        desc: "A/B-Testing zur Optimierung von Inhalten und Nutzererlebnis.",
                      },
                    ],
                  },
                },
                {
                  title: "Weitere Informationen",
                  description:
                    'Bei Fragen zu unserer Cookie-Richtlinie kontaktiere uns gerne über das ' +
                    '<a href="/kontakt.html" class="cc__link">Kontaktformular</a>.',
                },
              ],
            },
          },
        },
      },
    });
  }

  if (window.CookieConsent) {
    init();
  } else {
    var script = document.createElement("script");
    script.src = BASE + "cookieconsent.umd.js";
    script.onload = init;
    document.head.appendChild(script);
  }
})();
