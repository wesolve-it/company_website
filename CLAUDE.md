# Projektkonventionen

Next.js App Router und Payload CMS. Setup und Betrieb stehen in README.md.

- Frontend: `src/app/(frontend)`, CMS: `src/app/(payload)`.
- CMS-Konfiguration: `src/payload.config.ts`, Collections und Globals unter `src/`.
- Öffentliche CMS-Abfragen müssen `overrideAccess: false` verwenden. Entwürfe dürfen nie öffentlich erscheinen.
- Anfragen werden ausschließlich durch die validierende Kontakt-API angelegt, nicht durch eine offene Collection-API.
- React-Komponenten und Tailwind-Tokens verwenden; keine Alpine-/AOS-/HTML-Partial-Loader ergänzen.
- `legacy/` ist nur das Archiv der ursprünglichen Website. Änderungen an der neuen Website erfolgen in `src/`.
- `.env`, Datenbanken, Medienuploads und Testdaten nicht committen.
- Datenbankadapter getrennte Migrationen geben. PostgreSQL-Support nicht mit SQLite-Migrationen ausliefern.
- Nach Änderungen: Typecheck, relevante Tests und Produktionsbuild. Browserprüfungen nutzen `.test-data/`.
- Zielgruppe und Positionierung: `PRODUCT.md`. `DESIGN.md` dokumentiert das visuelle System der ursprünglichen Website in `legacy/`.
