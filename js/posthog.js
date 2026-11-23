(function () {
  "use strict";

  var key = window.POSTHOG_PUBLIC_KEY;
  var host = window.POSTHOG_HOST;
  var initialized = false;

  function warnIfDeveloping(variable) {
    var localHost = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
    if (localHost) {
      console.error(variable + " variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once " + variable + " is configured");
    }
  }

  function initialize() {
    if (initialized) return;
    if (!key) return warnIfDeveloping("POSTHOG_PUBLIC_KEY");
    if (!host) return warnIfDeveloping("POSTHOG_HOST");

    initialized = true;
    var script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js";
    script.onload = function () {
      window.posthog.init(key, {
        api_host: host,
        defaults: "2026-08-30",
        logs: {
          serviceName: "wesolve-it-website",
          environment: /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname) ? "development" : "production",
          serviceVersion: "1.0.0"
        },
        capture_exceptions: {
          capture_unhandled_errors: true,
          capture_unhandled_rejections: true,
          capture_console_errors: false
        }
      });

      if (window.CookieConsent.acceptedCategory("analytics")) {
        window.posthog.opt_in_capturing();
      } else {
        window.posthog.opt_out_capturing();
      }
    };
    document.head.appendChild(script);
  }

  document.addEventListener("posthog:consent-granted", initialize);
  if (window.CookieConsent && window.CookieConsent.acceptedCategory("analytics")) {
    initialize();
  }
})();
