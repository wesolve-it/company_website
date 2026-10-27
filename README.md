# wesolve-IT · Next.js & Payload CMS

Next.js App Router, React, TypeScript, Payload 3 und Tailwind 4. Die bestehenden Farben, Illustrationen und Inhalte wurden in gemeinsame React-Templates und strukturierte CMS-Daten überführt. Die unveränderten HTML-Quelldateien liegen zur Nachvollziehbarkeit unter `legacy/` und werden nicht ausgeliefert.

## Lokal starten

Node.js 24 LTS empfohlen.

```sh
npm ci
cp .env.example .env
openssl rand -hex 32
```

Den erzeugten Wert als `PAYLOAD_SECRET` in `.env` eintragen. Anschließend:

```sh
npm run seed
npm run dev
```

Website: http://localhost:3000 · CMS: http://localhost:3000/admin

Im Adminbereich den ersten Benutzer anlegen. Dieser erhält automatisch die Administratorrolle. Weitere Benutzer können nur Administratoren anlegen; Redakteure dürfen Inhalte, aber keine Rollen bearbeiten. Es gibt keine fest eingebauten Zugangsdaten.

SQLite (`payload.db`) und Medien (`media/`) entstehen lokal und sind von Git ausgeschlossen. `.env` enthält den geheimen Schlüssel und darf nicht eingecheckt werden. Next.js lädt `.env` automatisch; der Import verwendet `node --env-file=.env`.

## Inhaltspflege

- **Leistungen:** Name, URL, Überschrift, Einleitung, Hauptbild, Inhaltsabschnitte, Karten, FAQs, SEO und Reihenfolge.
- **Referenzen:** dieselben Grundlagen plus Kategorie, Logo, Eckdaten und Kundenstimme.
- **Medien:** Uploads mit Alternativtext und automatisch erzeugten Bildgrößen; die Website verwendet Next Image.
- **Kundenstimmen:** Zitat, Ansprechpartner, Position und Bild.
- **Seiten:** Impressum, Datenschutz, Quick-Check und neue Inhaltsseiten mit Rich-Text-Editor.
- **Startseite:** Haupttext, Bild und Einleitungstexte zu Leistungen und Referenzen. Über „Auf der Startseite anzeigen“ an den jeweiligen Datensätzen werden Karten ausgewählt.
- **Seiteneinstellungen:** Kontaktdaten, Navigation, soziale Profile und gemeinsamer Kontaktaufruf.
- **Anfragen:** über das Kontaktformular eingegangene Nachrichten.

Collections unterstützen Entwürfe und Versionen. Öffentliche Seiten und APIs liefern ausschließlich veröffentlichte Datensätze. Neue veröffentlichte Referenzen, Leistungen und Seiten erhalten automatisch eine Route und einen Sitemap-Eintrag. URL-Namen nach Veröffentlichung möglichst beibehalten; bei Änderungen Weiterleitungen ergänzen.

Der Import `npm run seed` ist wiederholbar: bestehende Inhalte werden nicht überschrieben. 5 Leistungen, 9 veröffentlichte Referenzen, 3 Kundenstimmen und 3 Inhaltsseiten werden importiert. `brotkultur-pur.html` enthielt tatsächlich eine FC-Nürnberg-Kopie: dieser Datensatz bleibt als Entwurf zur Korrektur erhalten. Die bisher leere AGB-Seite wird nicht als veröffentlichte Seite importiert. Die Quelltexte rechtlicher Seiten wurden übernommen; geänderte Dienste und Formulare müssen vor Veröffentlichung in diesen Texten berücksichtigt werden.

## Kontakt & Newsletter

Das Kontaktformular speichert Anfragen im CMS, mit Pflichtfeldprüfung, Herkunftsprüfung, Honeypot und einer Begrenzung der Anfragen. Die Telefonnummer ist freiwillig. Bei SMTP-Konfiguration wird zusätzlich eine Benachrichtigung verschickt. Scheitert diese, bleibt die Anfrage gespeichert und `notificationSent` bleibt `false`. Ohne SMTP funktionieren Speicherung und lokale Tests; Passwort-Reset-E-Mails benötigen für den produktiven Einsatz ebenfalls SMTP.

Der Newsletter ist vorbereitet und standardmäßig ausgeblendet. Erst nach Auswahl und Einrichtung eines Anbieters:

1. `NEWSLETTER_ENDPOINT` und gegebenenfalls `NEWSLETTER_API_KEY` setzen.
2. Die Anbieteranbindung so implementieren, dass sie dieses serverseitige POST-Payload versteht: `{ email, doubleOptIn: true, source: "website", consent: true }`. Optionaler Auth-Header: `Authorization: Bearer …`.
3. Der Anbieter muss Bestätigungs-E-Mail, Double-Opt-in, Abmeldung und Abonnentenstatus verwalten. Ein Flag im Request ersetzt diese Einrichtung nicht. In dieser Version wird noch kein Newsletter verschickt.
4. Datenschutzhinweise aktualisieren und in den Seiteneinstellungen „Newsletter-Anmeldung anzeigen“ aktivieren.

Anmeldungen werden an den konfigurierten Dienst übergeben, nicht parallel in einer zweiten Abonnentenliste gespeichert. Bei fehlender Konfiguration liefert die API einen Fehler statt einer falschen Erfolgsmeldung.

Tracking ist zunächst deaktiviert. Optionales Umami wird erst nach Zustimmung geladen; ein Widerruf lädt die Seite neu, damit das aktive Script entfernt wird. Die frühere Clarity-/ABlyft-Integration wurde nicht automatisch reaktiviert. Die externen Google Fonts sind weiterhin eingebunden.

## Prüfung

```sh
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Browserprüfungen verwenden eine isolierte Datenbank und Medien unter `.test-data/` und Port 3100. Geprüft werden öffentliche Routen, Navigation, Theme, FAQ, Filter, Redirects, Admin-Login, Inhaltspflege, Entwurfsschutz und Kontaktpersistenz. Screenshots entstehen in `.test-data/`. Optional kann ein vorhandener Chromium über `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` angegeben werden.

## Betrieb

Dies ist eine Anwendung mit Serverlaufzeit; ein statischer Export oder das direkte Hosting der alten HTML-Dateien reicht nicht mehr. Öffentliche Seiten werden serverseitig aus aktuellen veröffentlichten CMS-Inhalten gerendert. Ein Cache kann später anhand realer Last ergänzt werden.

Die beiliegende Docker-Konfiguration unterstützt einen einzelnen Server mit dauerhaftem SQLite-/Medienspeicher. Zuerst `SERVER_URL` auf die öffentliche HTTPS-Adresse setzen und einen sicheren Laufzeitschlüssel verwenden. Vor dem ersten Start:

```sh
docker compose build
docker compose run --rm website npm run migrate
docker compose run --rm website npm run seed
docker compose up -d
```

Den ersten Administrator vor öffentlicher Freigabe lokal anlegen. TLS und Zugriffsschutz werden am Reverse Proxy eingerichtet. Das Volume `website-data` mit Datenbank und Medien regelmäßig gemeinsam sichern und die Wiederherstellung testen. Die Anwendung muss Schreibrechte auf diesem Volume behalten. SQLite ist für eine einzelne Instanz vorgesehen; mehrere Instanzen erfordern eine gemeinsame Datenbank und gemeinsamen Medienspeicher.

PostgreSQL wird bei einer `postgresql://…`-URL automatisch verwendet. Dazu vor dem Wechsel eigene PostgreSQL-Migrationen mit `npm run payload -- migrate:create` in einer Entwicklungs-/Stagingumgebung erzeugen und testen. SQLite-Migrationen liegen separat unter `src/migrations/sqlite/`; Daten werden nicht automatisch von SQLite nach PostgreSQL übertragen. PostgreSQL und Docker wurden in dieser Arbeitsumgebung nicht gestartet.

Die Formularbegrenzung arbeitet pro Prozess. Für mehrere Instanzen eine gemeinsame Begrenzung am Proxy oder über Redis ergänzen. `TRUST_PROXY=true` nur verwenden, wenn der eigene Reverse Proxy `X-Forwarded-For` zuverlässig überschreibt; ohne dieses Flag gilt die Begrenzung gemeinsam für alle Formularanfragen des Prozesses.

Die kompatiblen Payload-Pakete sind auf dieselbe Version festgelegt. `overrides` aktualisieren transitive Pakete mit Sicherheitskorrekturen (Undici, Nodemailer, Sass, DOMPurify und den internen esbuild-Loader); bei Payload-Updates erneut Audit, Build und Browserprüfungen durchführen.
