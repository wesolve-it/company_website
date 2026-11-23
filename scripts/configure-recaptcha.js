const fs = require("node:fs");
const path = require("node:path");

const siteKey = process.env.SITE_RECAPTCHA_KEY?.trim();
if (siteKey && !/^[A-Za-z0-9_-]+$/.test(siteKey)) {
  throw new Error("SITE_RECAPTCHA_KEY has an invalid format");
}

const file = path.join(__dirname, "../kontakt.html");
const html = fs.readFileSync(file, "utf8");
const block = /<!-- recaptcha:start -->[\s\S]*?<!-- recaptcha:end -->/;
if (!block.test(html)) throw new Error("Contact form reCAPTCHA block is missing");

const widget = siteKey
  ? `<div class="overflow-x-auto" data-recaptcha-sitekey="${siteKey}"></div>
            <p class="text-sm" role="status" data-recaptcha-status></p>
            <noscript>Bitte aktiviere JavaScript oder kontaktiere uns per E-Mail.</noscript>`
  : '<div class="mt-6" data-netlify-recaptcha="true"></div>';
const markup = siteKey ? `<div class="mt-6">
            ${widget}
          </div>` : widget;

const output = html.replace(block, `<!-- recaptcha:start -->
          ${markup}
          <!-- recaptcha:end -->`);
if (output !== html) fs.writeFileSync(file, output);
