(() => {
  const form = document.getElementById("contact-form");
  const container = form?.querySelector("[data-recaptcha-sitekey]");
  if (!container) return;

  const status = form.querySelector("[data-recaptcha-status]");
  const en = document.documentElement.lang === "en";
  const t = en ? {
    loading: "Loading spam protection …",
    failed: "Spam protection could not be loaded. Please try again or contact us by email.",
    expired: "Please confirm the spam protection again.",
    error: "Spam protection reported an error. Please try again or contact us by email.",
    confirm: "Please confirm the spam protection before sending.",
  } : {
    loading: "Spam-Schutz wird geladen …",
    failed: "Der Spam-Schutz konnte nicht geladen werden. Versuche es erneut oder kontaktiere uns per E-Mail.",
    expired: "Bitte bestätige den Spam-Schutz erneut.",
    error: "Der Spam-Schutz meldet einen Fehler. Versuche es erneut oder kontaktiere uns per E-Mail.",
    confirm: "Bitte bestätige den Spam-Schutz vor dem Absenden.",
  };
  let loading = false;
  let widgetId;

  function loadCaptcha() {
    if (loading || widgetId !== undefined) return;
    loading = true;
    status.textContent = t.loading;

    const script = document.createElement("script");
    function fail() {
      loading = false;
      script.remove();
      delete window.renderContactCaptcha;
      status.textContent = t.failed;
    }

    window.renderContactCaptcha = () => {
      try {
        widgetId = window.grecaptcha.render(container, {
          sitekey: container.dataset.recaptchaSitekey,
          callback: () => { status.textContent = ""; },
          "expired-callback": () => { status.textContent = t.expired; },
          "error-callback": () => { status.textContent = t.error; },
        });
        loading = false;
        delete window.renderContactCaptcha;
        status.textContent = t.confirm;
      } catch {
        fail();
      }
    };

    script.src = "https://www.google.com/recaptcha/api.js?onload=renderContactCaptcha&render=explicit&hl=" + (en ? "en" : "de");
    script.async = true;
    script.onerror = fail;
    document.head.append(script);
  }

  form.addEventListener("focusin", loadCaptcha, { once: true });
  form.addEventListener("pointerdown", loadCaptcha, { once: true });
  form.addEventListener("submit", event => {
    if (widgetId !== undefined && window.grecaptcha.getResponse(widgetId)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    loadCaptcha();
    if (widgetId !== undefined) {
      status.textContent = t.confirm;
      container.querySelector("iframe")?.focus();
    }
  }, { capture: true });
})();
