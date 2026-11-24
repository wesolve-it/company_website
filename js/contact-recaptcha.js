(() => {
  const form = document.getElementById("contact-form");
  const container = form?.querySelector("[data-recaptcha-sitekey]");
  if (!container) return;

  const status = form.querySelector("[data-recaptcha-status]");
  let loading = false;
  let widgetId;

  function loadCaptcha() {
    if (loading || widgetId !== undefined) return;
    loading = true;
    status.textContent = "Spam-Schutz wird geladen …";

    const script = document.createElement("script");
    function fail() {
      loading = false;
      script.remove();
      delete window.renderContactCaptcha;
      status.textContent = "Der Spam-Schutz konnte nicht geladen werden. Versuche es erneut oder kontaktiere uns per E-Mail.";
    }

    window.renderContactCaptcha = () => {
      try {
        widgetId = window.grecaptcha.render(container, {
          sitekey: container.dataset.recaptchaSitekey,
          callback: () => { status.textContent = ""; },
          "expired-callback": () => { status.textContent = "Bitte bestätige den Spam-Schutz erneut."; },
          "error-callback": () => { status.textContent = "Der Spam-Schutz meldet einen Fehler. Versuche es erneut oder kontaktiere uns per E-Mail."; },
        });
        loading = false;
        delete window.renderContactCaptcha;
        status.textContent = "Bitte bestätige den Spam-Schutz vor dem Absenden.";
      } catch {
        fail();
      }
    };

    script.src = "https://www.google.com/recaptcha/api.js?onload=renderContactCaptcha&render=explicit&hl=de";
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
      status.textContent = "Bitte bestätige den Spam-Schutz vor dem Absenden.";
      container.querySelector("iframe")?.focus();
    }
  }, { capture: true });
})();
