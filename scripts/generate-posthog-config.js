const fs = require("fs");
const path = require("path");

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};

  return fs.readFileSync(filePath, "utf8").split(/\r?\n/).reduce((values, line) => {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || line.trim().startsWith("#")) return values;
    values[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    return values;
  }, {});
}

const fileValues = readEnvFile(path.join(process.cwd(), ".env"));
const key = process.env.POSTHOG_PUBLIC_KEY || fileValues.POSTHOG_PUBLIC_KEY;
const host = process.env.POSTHOG_HOST || fileValues.POSTHOG_HOST;
const config = [];

if (key) config.push("window.POSTHOG_PUBLIC_KEY = " + JSON.stringify(key) + ";");
if (host) config.push("window.POSTHOG_HOST = " + JSON.stringify(host) + ";");

fs.writeFileSync(path.join(process.cwd(), "js/posthog-config.js"), config.join("\n") + (config.length ? "\n" : ""));
