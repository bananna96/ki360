# ki360

KI360 ist ein Content-getriebenes Webprojekt mit zwei Teilen:

- Web-App: Next.js 16 (App Router) unter web
- CMS: Sanity Studio v5 unter studio

Die Inhalte werden in Sanity gepflegt und in der Web-App per GROQ geladen.

## Projektstruktur

- web: Frontend, Seiten, UI-Komponenten, API-Route für Prompt-Coaching
- studio: Sanity Studio, Schemas und Redaktionsstruktur
- static: zusätzliche statische Assets

## Tech-Stack

Web:

- Next.js 16.1.6
- React 19
- Tailwind CSS v4
- Sanity Client + next-sanity
- OpenAI SDK (Chat API)

Studio:

- Sanity 5.14.x
- Vision Plugin

## Voraussetzungen

- Node.js 20+
- npm 10+ (oder kompatibler Package-Manager)

## Lokale Entwicklung

1. Abhängigkeiten installieren

Im Ordner web:

npm install

Im Ordner studio:

npm install

2. Umgebungsvariablen setzen

Lege im Ordner web eine Datei .env.local an.

Empfohlene Variablen:

- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET
- SANITY_API_TOKEN
- OPENAI_API_KEY
- RATE_LIMIT_SECRET
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_MATOMO_URL (optional)
- NEXT_PUBLIC_MATOMO_SITE_ID (optional)

Wichtig:

- Das Studio ist aktuell fest auf projectId xo4k5wqr und Dataset production konfiguriert.
- Die Web-App nutzt Environment-Variablen für Projekt und Dataset.
- Für konsistentes Verhalten in Local und Prod sollten beide auf dasselbe Sanity-Setup zeigen.

3. Beide Apps starten

Studio (aus studio):

npm run dev

Web (aus web):

npm run dev

Standardmäßig:

- Web: http://localhost:3000
- Studio: http://localhost:3333

## Build und Start

Web:

- Build: npm run build
- Start: npm run start
- Lint: npm run lint

Studio:

- Build: npm run build
- Start: npm run start
- Deploy Studio: npm run deploy

## Seiten und Routen (Web)

Hauptrouten:

- /
- /grundlagen (potentielles Feature)
- /wasistki
- /wasistki/technischemethodiken
- /prompten
- /prompten/chat
- /about
- /about/impressum
- /about/datenschutz

Navigation und Footer werden aus dem Sanity-Dokument navigation gerendert.

## Content-Modell (Sanity)

Registrierte Dokumenttypen:

- navigation
- landingpage
- basicsOverview
- whatIsAi
- prompting
- about
- privacyPolicy
- imprint

Hinweise:

- prompting enthält Intro, Slides (Tipps, Bullets, Beispiel, Bild) und Button-Link.
- whatIsAi ist in mehrere Sections aufgeteilt und steuert die Inhalte der Seite /wasistki.

## Datenfluss

1. Sanity-Queries in web/src/lib/sanity/queries.ts
2. Server Components laden Inhalte über den Sanity Client
3. Bilder laufen über SanityImage und image-url Helper
4. Navigation und Footer werden zentral im Layout eingebunden

## Prompt-Coach API

API-Endpunkt:

- POST /api/chat

Funktionen:

- OpenAI-basierte Prompt-Coaching-Antworten auf Deutsch
- Safety-Filter für sensible Themen (inkl. unscharfer Treffer, z. B. Tippfehler)
- Prompt-Tipp-Kontext aus Sanity (prompting.slides)
- Cookie-basiertes Rate-Limiting (5 Requests pro Stunde)

Wichtige Datei:

- web/src/app/api/chat/route.ts

## Tracking

Matomo wird im Layout nur aktiviert, wenn:

- NODE_ENV = production
- NEXT_PUBLIC_MATOMO_URL gesetzt
- NEXT_PUBLIC_MATOMO_SITE_ID gesetzt

## Typische Fehlerquellen

1. Links funktionieren lokal, aber nicht in Produktion

- Ursache oft: inkonsistente Linkformate im CMS (z. B. fehlender führender Slash oder externe URL ohne Protokoll).
- Im Projekt werden Hrefs inzwischen normalisiert, um diese Unterschiede robuster abzufangen.

2. Unterschiedliche Inhalte in Local und Prod

- Prüfen, ob NEXT_PUBLIC_SANITY_PROJECT_ID und NEXT_PUBLIC_SANITY_DATASET auf dieselbe Sanity-Umgebung zeigen wie das Studio.

3. Chat API liefert 503

- Häufig fehlen Sanity-Daten für prompting oder die Verbindung zum Dataset ist nicht korrekt.

## Relevante Dateien

- [web/src/app/layout.tsx](web/src/app/layout.tsx)
- [web/src/lib/sanity/client.ts](web/src/lib/sanity/client.ts)
- [web/src/lib/sanity/queries.ts](web/src/lib/sanity/queries.ts)
- [web/src/app/api/chat/route.ts](web/src/app/api/chat/route.ts)
- [web/src/components/custom/nav/Nav.tsx](web/src/components/custom/nav/Nav.tsx)
- [web/src/components/custom/nav/Footer.tsx](web/src/components/custom/nav/Footer.tsx)
- [studio/sanity.config.ts](studio/sanity.config.ts)
- [studio/sanity.cli.ts](studio/sanity.cli.ts)
- [studio/schemaTypes/index.ts](studio/schemaTypes/index.ts)

## Lizenz

UNLICENSED
