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

  function updatePostHogConsent() {
    if (CookieConsent.acceptedCategory("analytics")) {
      if (window.posthog) window.posthog.opt_in_capturing();
      document.dispatchEvent(new Event("posthog:consent-granted"));
    } else if (window.posthog) {
      window.posthog.opt_out_capturing();
    }
  }

  function init() {
    if (!window.CookieConsent) return;

    CookieConsent.run({
      onConsent: updatePostHogConsent,
      onChange: updatePostHogConsent,
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
              { name: /^ph_/ },     // PostHog
            ],
          },
          services: {
            clarity: { label: "Microsoft Clarity" },
            ablyft: { label: "ABlyft (A/B-Testing)" },
            posthog: { label: "PostHog" },
          },
        },
      },

      language: {
        default: "de",
        autoDetect: "document", // Sprache aus <html lang="…">: /en/-Seiten bekommen Englisch
        translations: {
          de: {
            consentModal: {
              title: "Wir verwenden Cookies",
              description:
                "Wir setzen Cookies und ähnliche Technologien ein. Notwendige sind für den Betrieb der Website erforderlich. " +
                "Optionale Analyse- und Optimierungstools (Microsoft Clarity, ABlyft, PostHog) helfen uns, die Seite zu verbessern – " +
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
                      {
                        name: "PostHog",
                        desc: "Analyse des Nutzerverhaltens und Session-Aufzeichnungen.",
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
          en: {
            consentModal: {
              title: "We use cookies",
              description:
                "We use cookies and similar technologies. Necessary ones are required for the website to work. " +
                "Optional analytics and optimisation tools (Microsoft Clarity, ABlyft, PostHog) help us improve the site – " +
                "they are only loaded with your consent. Details in our " +
                '<a href="/datenschutz.html" hreflang="de" class="cc__link">privacy policy (in German)</a>.',
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject",
              showPreferencesBtn: "Settings",
              footer:
                '<a href="/datenschutz.html" hreflang="de" class="cc__link">Privacy policy (DE)</a>' +
                '<a href="/impressum.html" hreflang="de" class="cc__link">Legal notice (DE)</a>',
            },
            preferencesModal: {
              title: "Cookie settings",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Save selection",
              closeIconLabel: "Close",
              serviceCounterLabel: "Service(s)",
              sections: [
                {
                  title: "Your privacy",
                  description:
                    "Here you decide which categories you allow. You can withdraw or change your choice at any time " +
                    'via the "Cookie settings" link in the footer.',
                },
                {
                  title: "Necessary",
                  description:
                    "These cookies and technologies are required to run the website and to protect the contact form " +
                    "(spam protection via reCAPTCHA). We also use Umami, a cookieless analytics tool that stores no " +
                    "personal data. This category is always active.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analytics & optimisation",
                  description:
                    "These tools help us understand how visitors use the website so we can improve content and user " +
                    "experience. They are only loaded after you consent.",
                  linkedCategory: "analytics",
                  cookieTable: {
                    headers: { name: "Service", desc: "Purpose" },
                    body: [
                      { name: "Microsoft Clarity", desc: "Analysis of user behaviour (heatmaps, session recordings)." },
                      { name: "ABlyft", desc: "A/B testing to optimise content and user experience." },
                      { name: "PostHog", desc: "Analysis of user behaviour and session recordings." },
                    ],
                  },
                },
                {
                  title: "More information",
                  description:
                    "If you have questions about our cookie policy, feel free to reach us via the " +
                    '<a href="/en/contact" class="cc__link">contact form</a>.',
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
