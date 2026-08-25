import type { FaqItem, Locale, Service } from './types';
import { servicesBundle as englishServices } from './en/services';
import { servicesBundle as slovakServices } from './sk/services';
import { seoPaths } from '../lib/seo/paths';
import type { LocalizedPaths } from '../lib/seo/types';

export interface ServicePageContent extends Service {
  paths: LocalizedPaths;
  seoTitle: string;
  seoDescription: string;
  definition: string;
  body: [string, string, string];
  bestFor: string[];
  outcomes: string[];
  faq: [FaqItem, FaqItem, FaqItem];
  updatedAt: string;
}

type Detail = Omit<ServicePageContent, keyof Service | 'paths'>;

const pathsById: Record<Service['id'], LocalizedPaths> = {
  'business-websites': seoPaths.businessWebsites,
  'landing-pages': seoPaths.landingPages,
  'web-apps': seoPaths.webApplications,
  'ai-interfaces': seoPaths.aiInterfaces,
  redesign: seoPaths.redesignMigration,
  integrations: seoPaths.apiIntegrations,
  maintenance: seoPaths.maintenanceDevops,
};

const en: Record<Service['id'], Detail> = {
  'business-websites': {
    seoTitle: 'Business Website Development for Europe | EUHub',
    seoDescription:
      'Fast, accessible business websites for European companies, with technical SEO, analytics, integrations and long-term engineering support.',
    definition:
      'Business website development is the design and engineering of a company’s primary digital platform: its public explanation, search surface, conversion path and integration layer. We build that platform as maintainable infrastructure rather than a collection of marketing pages.',
    body: [
      'A credible business website must explain the offer quickly, answer the questions a buyer brings from search and move qualified visitors toward a measurable next step. We start with audience, positioning and information architecture before visual design, so every section has a clear job.',
      'The implementation is static-first where practical, responsive across real breakpoints and accessible by default. Metadata, canonicals, structured data, sitemaps and internal links are part of the build—not a checklist added after launch. Analytics events are designed around the conversion path.',
      'Where the website touches CRM, email, payments, booking or internal data, we treat those connections as production software. Validation, failure states, security boundaries, monitoring and ownership are defined before release, with a maintainable deployment path for future changes.',
    ],
    bestFor: [
      'B2B companies replacing an outdated or fragile website',
      'European firms that need qualified lead generation and clear attribution',
      'Teams that need a website connected to real business systems',
    ],
    outcomes: [
      'A clear offer and conversion path for priority audiences',
      'Search-ready, accessible and maintainable page architecture',
      'Documented integrations, analytics and long-term ownership',
    ],
    faq: [
      {
        question: 'How long does a business website take to build?',
        answer:
          'A focused business website usually takes six to twelve weeks. The exact timeline depends on content readiness, approval speed, integrations and migration risk; the initial diagnostic produces a concrete plan.',
      },
      {
        question: 'Can you preserve our existing search visibility?',
        answer:
          'Yes. We inventory existing URLs, map redirects, retain valuable content, validate canonicals and alternates, and compare the new build against the current search baseline before launch.',
      },
      {
        question: 'Can the website connect to our CRM or ERP?',
        answer:
          'Yes. CRM, ERP, email, payment and internal-system integrations can be designed as part of the website, with validation, retries, monitoring and documented ownership.',
      },
    ],
    updatedAt: '2026-08-26',
  },
  'landing-pages': {
    seoTitle: 'Conversion Landing Page Development | EUHub',
    seoDescription:
      'Fast campaign and service landing pages for European businesses, engineered around one audience, one offer, measurable conversion and clean analytics.',
    definition:
      'Landing page development is the focused design and engineering of a page built for one audience, one offer and one measurable action. It combines message hierarchy, conversion design, fast delivery, analytics and reliable form or system integration.',
    body: [
      'A landing page succeeds when a visitor can understand the promise, relevance and next step without reconstructing the company’s full story. We narrow the page around a single campaign or commercial intent and remove competing paths that dilute the decision.',
      'Copy structure, proof requirements, objection handling and form scope are agreed before the visual system is applied. The page is then built for mobile speed, accessible interaction and clean measurement, including campaign parameters and events that survive the handoff into CRM.',
      'The result is a reusable campaign asset rather than disposable markup. Components, metadata and analytics conventions can support later variants, while each published page retains a specific search and conversion purpose instead of becoming a doorway page.',
    ],
    bestFor: [
      'Paid campaigns that need a dedicated conversion destination',
      'New services or products that require message validation',
      'Events, audits and lead magnets with a single next action',
    ],
    outcomes: [
      'A focused message hierarchy with fewer conversion distractions',
      'Reliable campaign attribution from click to qualified enquiry',
      'A fast, reusable page system for future controlled variants',
    ],
    faq: [
      {
        question: 'How quickly can a landing page launch?',
        answer:
          'A focused landing page can often launch in two to four weeks when the offer, approvals and integrations are ready. Discovery identifies any content or tracking dependency before the schedule is committed.',
      },
      {
        question: 'Do you support A/B testing?',
        answer:
          'Yes. We can structure page variants, events and success criteria for controlled testing, but recommend sufficient traffic and one meaningful variable per experiment.',
      },
      {
        question: 'Can the form send leads into our CRM?',
        answer:
          'Yes. Form submissions can be validated, protected from abuse and delivered to CRM, email or webhook workflows with explicit error handling and attribution fields.',
      },
    ],
    updatedAt: '2026-08-26',
  },
  'web-apps': {
    seoTitle: 'Custom Web Application Development | EUHub',
    seoDescription:
      'Custom portals, dashboards and operational web applications for European businesses, with secure access, integrations and auditable workflows.',
    definition:
      'Custom web application development creates browser-based software around a company’s actual workflows instead of forcing those workflows into a generic template. Typical products include client portals, operational dashboards, booking systems and internal tools with defined operational ownership.',
    body: [
      'We begin by modelling users, permissions, decisions, data and failure states. That work separates the essential workflow from accumulated spreadsheet or email habits and gives the application a testable boundary before screens and endpoints multiply.',
      'The interface, API contracts, validation and persistence model are designed together. Role-based access, audit logging, error handling and observability are treated as core behavior, especially when the application coordinates financial, operational or regulated work.',
      'Delivery is incremental: a narrow end-to-end workflow proves the architecture, then additional capabilities follow behind the same contracts. Documentation, automated tests and deployment ownership make the system maintainable after the initial release.',
    ],
    bestFor: [
      'Teams coordinating critical work through spreadsheets and email',
      'Businesses that need client or partner self-service portals',
      'Operations that require permissions, traceability and live data',
    ],
    outcomes: [
      'A workflow designed around real roles, rules and exceptions',
      'Secure, auditable access to operational data and actions',
      'A tested platform that can grow without replacing its foundation',
    ],
    faq: [
      {
        question: 'What types of web applications do you build?',
        answer:
          'We build internal tools, operational dashboards, client portals, booking systems and other browser-based applications connected to business data and workflows.',
      },
      {
        question: 'Can you work with our existing backend?',
        answer:
          'Yes. We can build against existing REST, GraphQL or SOAP interfaces, or define a new integration layer when the current backend is not suitable for direct browser access.',
      },
      {
        question: 'How do you control access?',
        answer:
          'Access is designed around explicit roles and permissions, enforced on the server, and supported by secure session handling, validation and audit-friendly event records.',
      },
    ],
    updatedAt: '2026-08-26',
  },
  'ai-interfaces': {
    seoTitle: 'AI Interface and RAG Frontend Development | EUHub',
    seoDescription:
      'Secure AI assistant, RAG and copilot interfaces for European teams, with streaming, citations, review controls and production integration.',
    definition:
      'AI interface development turns a model or retrieval system into a usable, controlled product surface. It covers the conversation or workflow UI, streaming responses, source display, human review, permissions, failure handling and integration with business systems.',
    body: [
      'A useful AI interface does more than place a chat box in front of an API. It must tell users what the system can do, expose uncertainty and sources where available, preserve context intentionally and make escalation or correction straightforward.',
      'We design the interface alongside retrieval, tool and permission boundaries. Secure document handling, model routing, timeouts, fallbacks and human-in-the-loop review are visible product behaviors, not hidden implementation details that only appear during failure.',
      'Instrumentation records latency, cost, tool use and user outcomes without collecting unnecessary personal data. This creates the evidence needed to improve prompts, retrieval and workflow design while keeping the interface understandable and accountable.',
    ],
    bestFor: [
      'Teams productising an internal assistant or retrieval system',
      'Businesses adding AI to a controlled document workflow',
      'Products that need transparent sources and human review',
    ],
    outcomes: [
      'A clear interface for capabilities, limits and review decisions',
      'Secure handling of documents, permissions and streamed output',
      'Operational telemetry for quality, latency, cost and adoption',
    ],
    faq: [
      {
        question: 'Can you connect an interface to our existing AI backend?',
        answer:
          'Yes. We can integrate with an existing model gateway, RAG service or workflow API and define the frontend contracts needed for streaming, citations, tools and errors.',
      },
      {
        question: 'Do you support human review?',
        answer:
          'Yes. Review, approval, correction and escalation states can be designed into the workflow so consequential output does not bypass accountable people.',
      },
      {
        question: 'How do you handle AI failures?',
        answer:
          'The interface uses explicit timeouts, recoverable errors, model or tool fallbacks, source visibility and safe escalation paths instead of presenting every response as certain.',
      },
    ],
    updatedAt: '2026-08-26',
  },
  redesign: {
    seoTitle: 'Website Redesign and SEO-Safe Migration | EUHub',
    seoDescription:
      'SEO-safe website redesign and migration for European businesses, including content inventory, redirect mapping, modern rebuild and launch validation.',
    definition:
      'Website redesign and migration is the controlled replacement of an existing website while preserving valuable content, URLs, search signals and business integrations. The work combines content decisions, redirect mapping, modern engineering and measured launch verification.',
    body: [
      'A redesign can damage visibility when it treats the existing site as disposable. We first inventory indexable URLs, search value, content, analytics events, forms and integrations so the new architecture keeps what works and intentionally retires what does not.',
      'The replacement is built on a maintainable system with self-canonicals, reciprocal language alternates, structured data and a redirect map that has one accountable destination per retired URL. Staging blocks indexation until the launch checklist is complete.',
      'After release we verify status codes, canonical targets, sitemap contents, analytics and priority conversion paths. Search Console monitoring and rollback criteria make migration risk observable instead of relying on a visual sign-off alone.',
    ],
    bestFor: [
      'Companies replacing a slow, insecure or unmaintainable platform',
      'Teams consolidating domains, languages or duplicated content',
      'Businesses that cannot afford to lose established search demand',
    ],
    outcomes: [
      'A documented inventory and one-to-one redirect strategy',
      'A modern rebuild that preserves priority content and intent',
      'A measured launch with post-release search and conversion checks',
    ],
    faq: [
      {
        question: 'Will a redesign hurt our SEO?',
        answer:
          'It can if URLs, content and internal links change without a migration plan. We inventory the current site, map redirects and validate the new technical signals before and after launch.',
      },
      {
        question: 'Can you migrate content from WordPress?',
        answer:
          'Yes. We can audit and migrate valuable content from WordPress or another CMS, while removing obsolete material and preserving required media, metadata and redirects.',
      },
      {
        question: 'How do you validate the launch?',
        answer:
          'We crawl priority URLs, test redirects and canonicals, verify sitemap and analytics behavior, check conversion paths and monitor Search Console for unexpected coverage changes.',
      },
    ],
    updatedAt: '2026-08-26',
  },
  integrations: {
    seoTitle: 'API, CRM and ERP Integration Development | EUHub',
    seoDescription:
      'Reliable API, CRM, ERP, payment and logistics integrations for European businesses across REST, GraphQL, webhooks and legacy SOAP.',
    definition:
      'API and business integration development connects websites and applications to the systems that run sales, operations, payments, logistics and reporting. It includes data contracts, authentication, validation, retries, observability and accountable ownership of every failure path.',
    body: [
      'An integration is reliable only when both success and failure are designed. We document the source of truth, data mapping, authentication, rate limits, idempotency requirements and recovery behavior before connecting production systems.',
      'Modern REST, GraphQL and webhook interfaces are supported alongside legacy SOAP services where replacement is not practical. Adapter boundaries keep protocol-specific complexity away from the user interface and make future system changes less disruptive.',
      'Logs, metrics and alerts are designed around business consequences, not just HTTP status. A failed lead, duplicate payment or delayed logistics update must be identifiable and recoverable by the team that owns the process.',
    ],
    bestFor: [
      'Websites that need CRM, ERP, payment or logistics connectivity',
      'Teams replacing manual data transfer between business systems',
      'Products that must bridge modern interfaces and legacy SOAP',
    ],
    outcomes: [
      'Explicit data ownership, contracts and validation rules',
      'Recoverable delivery with retries, idempotency and monitoring',
      'A maintainable adapter boundary around legacy dependencies',
    ],
    faq: [
      {
        question: 'Can you integrate with legacy SOAP APIs?',
        answer:
          'Yes. We isolate SOAP envelopes, authentication and error mapping behind a modern adapter so the website or application does not depend directly on legacy protocol details.',
      },
      {
        question: 'How do you prevent duplicate actions?',
        answer:
          'Where the receiving system supports it, we use idempotency keys, stable event identifiers and replay-safe handlers, with logs that make duplicate or delayed delivery visible.',
      },
      {
        question: 'Who monitors an integration after launch?',
        answer:
          'Monitoring and ownership are agreed before launch. A maintenance arrangement can cover alerts, incident response, credentials, vendor changes and controlled retries.',
      },
    ],
    updatedAt: '2026-08-26',
  },
  maintenance: {
    seoTitle: 'Website Maintenance and DevOps Support | EUHub',
    seoDescription:
      'Website maintenance, hosting, CI/CD, monitoring, security updates and recovery support for European businesses that need long-term ownership.',
    definition:
      'Website maintenance and DevOps support is the ongoing technical ownership of a live website or application. It combines secure delivery, monitoring, patching, backups, recovery, performance review and controlled iteration throughout the system’s complete production lifetime.',
    body: [
      'Production software changes even when its interface does not. Dependencies age, certificates and credentials rotate, external APIs evolve and traffic reveals behavior that staging cannot reproduce. A maintenance plan assigns ownership to those changes before they become incidents.',
      'We use repeatable CI/CD, environment separation, monitoring, logs and backup verification to make releases and recovery observable. Security updates are assessed and deployed with the same discipline as product changes rather than accumulating into periodic emergency rebuilds.',
      'The retainer scope can also include performance review, analytics validation and small product iterations. Priorities and response expectations are explicit, so ongoing care is a managed engineering service rather than an undefined support inbox.',
    ],
    bestFor: [
      'Teams without dedicated ownership for a production website',
      'Applications that require monitored integrations and regular releases',
      'Businesses that need backup, recovery and security discipline',
    ],
    outcomes: [
      'Repeatable releases with clear production ownership',
      'Actionable monitoring, patching and recovery procedures',
      'A prioritized path for performance and product improvements',
    ],
    faq: [
      {
        question: 'What does a maintenance retainer include?',
        answer:
          'Scope can include hosting oversight, CI/CD, monitoring, dependency and security updates, backup checks, incident response and an agreed capacity for small improvements.',
      },
      {
        question: 'Can you maintain a site you did not build?',
        answer:
          'Usually, after a technical diagnostic. We first assess the codebase, deployment, dependencies, access, monitoring and recovery risk, then define what can be supported responsibly.',
      },
      {
        question: 'How are urgent issues handled?',
        answer:
          'Response expectations, contact paths and supported severity levels are agreed in the maintenance scope. Monitoring provides the evidence needed to diagnose and prioritize an incident.',
      },
    ],
    updatedAt: '2026-08-26',
  },
};

const sk: Record<Service['id'], Detail> = {
  'business-websites': {
    seoTitle: 'Vývoj firemných webov pre európske firmy | EUHub',
    seoDescription:
      'Rýchle a prístupné firemné weby s technickým SEO, analytikou, integráciami a dlhodobou technickou podporou pre firmy v EÚ.',
    definition:
      'Vývoj firemného webu je návrh a realizácia hlavnej digitálnej platformy firmy: verejného vysvetlenia ponuky, priestoru pre vyhľadávanie, konverznej cesty a integračnej vrstvy. Platformu staviame ako udržiavateľnú infraštruktúru, nie ako súbor marketingových stránok bez technického vlastníctva.',
    body: [
      'Dôveryhodný firemný web musí rýchlo vysvetliť ponuku, odpovedať na otázky návštevníka z vyhľadávania a viesť kvalifikovaného záujemcu k merateľnému ďalšiemu kroku. Pred vizuálnym dizajnom preto riešime publikum, pozicioning a informačnú architektúru.',
      'Implementácia je tam, kde je to vhodné, static-first, responzívna a prístupná. Metadata, canonical odkazy, štruktúrované dáta, sitemap a interné odkazy sú súčasťou buildu. Analytické udalosti vychádzajú z reálnej konverznej cesty.',
      'Ak web komunikuje s CRM, e-mailom, platbami, bookingom alebo internými dátami, pracujeme s týmito spojeniami ako s produkčným softvérom. Validácia, chybové stavy, bezpečnostné hranice, monitoring a vlastníctvo sú definované pred spustením.',
    ],
    bestFor: [
      'B2B firmy, ktoré nahrádzajú zastaraný alebo krehký web',
      'Firmy v EÚ, ktoré potrebujú kvalifikované leady a jasnú atribúciu',
      'Tímy, ktoré potrebujú web prepojený s biznis systémami',
    ],
    outcomes: [
      'Jasná ponuka a konverzná cesta pre prioritné publikum',
      'Vyhľadateľná, prístupná a udržiavateľná architektúra',
      'Zdokumentované integrácie, analytika a dlhodobé vlastníctvo',
    ],
    faq: [
      {
        question: 'Ako dlho trvá vývoj firemného webu?',
        answer:
          'Zameraný firemný web zvyčajne trvá šesť až dvanásť týždňov. Presný harmonogram závisí od obsahu, schvaľovania, integrácií a migračného rizika; diagnostika vytvorí konkrétny plán.',
      },
      {
        question: 'Viete zachovať našu súčasnú viditeľnosť vo vyhľadávaní?',
        answer:
          'Áno. Zmapujeme existujúce URL, presmerovania, hodnotný obsah, canonical a jazykové alternatívy a nový build porovnáme so súčasným stavom pred spustením.',
      },
      {
        question: 'Viete web prepojiť s CRM alebo ERP?',
        answer:
          'Áno. Integrácie CRM, ERP, e-mailu, platieb a interných systémov môžu byť súčasťou webu vrátane validácie, opakovaní, monitoringu a vlastníctva.',
      },
    ],
    updatedAt: '2026-08-26',
  },
  'landing-pages': {
    seoTitle: 'Vývoj konverzných landing pages pre firmy | EUHub',
    seoDescription:
      'Rýchle landing pages pre kampane a služby, postavené okolo jedného publika, jednej ponuky, merateľnej konverzie a čistej analytiky.',
    definition:
      'Vývoj landing page je cielený návrh a realizácia stránky pre jedno publikum, jednu ponuku a jednu merateľnú akciu. Spája hierarchiu posolstva, konverzný dizajn, rýchle dodanie, analytiku a spoľahlivú integráciu formulára alebo systému do obchodného procesu.',
    body: [
      'Landing page funguje vtedy, keď návštevník pochopí prísľub, relevantnosť a ďalší krok bez skladania celého príbehu firmy. Stránku zužujeme na konkrétnu kampaň alebo komerčný zámer a odstraňujeme konkurenčné cesty.',
      'Štruktúru textu, potrebné dôkazy, námietky a rozsah formulára dohodneme pred aplikovaním vizuálneho systému. Stránka je potom postavená pre mobilnú rýchlosť, prístupnosť a čisté meranie vrátane kampanových parametrov a CRM atribúcie.',
      'Výsledkom je opakovane použiteľný kampanový asset, nie jednorazový kód. Komponenty, metadata a analytické konvencie podporia ďalšie varianty, pričom každá publikovaná stránka si zachová konkrétny vyhľadávací a konverzný účel.',
    ],
    bestFor: [
      'Platené kampane, ktoré potrebujú vlastnú konverznú stránku',
      'Nové služby alebo produkty, pri ktorých sa overuje posolstvo',
      'Eventy, audity a lead magnety s jednou ďalšou akciou',
    ],
    outcomes: [
      'Cielená hierarchia posolstva bez zbytočných rozptýlení',
      'Spoľahlivá atribúcia od kliknutia po kvalifikovanú požiadavku',
      'Rýchly a opakovane použiteľný systém pre riadené varianty',
    ],
    faq: [
      {
        question: 'Ako rýchlo môže byť landing page spustená?',
        answer:
          'Zameraná landing page môže byť hotová za dva až štyri týždne, ak sú ponuka, schvaľovanie a integrácie pripravené. Discovery odhalí závislosti ešte pred potvrdením harmonogramu.',
      },
      {
        question: 'Podporujete A/B testovanie?',
        answer:
          'Áno. Vieme pripraviť varianty, udalosti a kritériá úspechu pre riadené testovanie; odporúčame však dostatočnú návštevnosť a jednu významnú premennú na experiment.',
      },
      {
        question: 'Môže formulár posielať leady do CRM?',
        answer:
          'Áno. Odoslania môžu byť validované, chránené proti zneužitiu a doručené do CRM, e-mailu alebo webhook workflow s atribučnými údajmi.',
      },
    ],
    updatedAt: '2026-08-26',
  },
  'web-apps': {
    seoTitle: 'Vývoj webových aplikácií na mieru | EUHub',
    seoDescription:
      'Portály, dashboardy a prevádzkové webové aplikácie pre firmy v EÚ, s bezpečným prístupom, integráciami a auditovateľnými workflow.',
    definition:
      'Vývoj webovej aplikácie na mieru vytvára softvér v prehliadači podľa reálnych firemných workflow namiesto tlačenia procesov do univerzálnej šablóny. Typickými produktmi sú klientske portály, prevádzkové dashboardy, rezervačné systémy a interné nástroje s jasným technickým vlastníctvom.',
    body: [
      'Začíname modelovaním používateľov, oprávnení, rozhodnutí, dát a chybových stavov. Tým oddelíme podstatný workflow od historických návykov v tabuľkách a e-mailoch a dáme aplikácii testovateľnú hranicu.',
      'Rozhranie, API kontrakty, validáciu a dátový model navrhujeme spolu. Role-based prístup, audit log, error handling a observabilita sú základné správanie najmä pri finančnej, prevádzkovej alebo regulovanej práci.',
      'Dodávame inkrementálne: úzky end-to-end workflow overí architektúru a ďalšie schopnosti pribúdajú za rovnakými kontraktmi. Dokumentácia, automatické testy a vlastníctvo deploymentu udržia systém po prvom release.',
    ],
    bestFor: [
      'Tímy, ktoré koordinujú kritickú prácu v tabuľkách a e-mailoch',
      'Firmy, ktoré potrebujú samoobslužný klientsky alebo partnerský portál',
      'Prevádzku vyžadujúcu oprávnenia, sledovateľnosť a živé dáta',
    ],
    outcomes: [
      'Workflow navrhnutý okolo reálnych rolí, pravidiel a výnimiek',
      'Bezpečný a auditovateľný prístup k prevádzkovým dátam',
      'Testovaná platforma, ktorá rastie bez výmeny svojho základu',
    ],
    faq: [
      {
        question: 'Aké webové aplikácie vyvíjate?',
        answer:
          'Vyvíjame interné nástroje, prevádzkové dashboardy, klientske portály, rezervačné systémy a ďalšie aplikácie prepojené s firemnými dátami a workflow.',
      },
      {
        question: 'Viete pracovať s naším existujúcim backendom?',
        answer:
          'Áno. Vieme pracovať s existujúcim REST, GraphQL alebo SOAP rozhraním, prípadne navrhnúť integračnú vrstvu, keď backend nie je vhodný na priame použitie.',
      },
      {
        question: 'Ako riadite prístup používateľov?',
        answer:
          'Prístup navrhujeme podľa jasných rolí a oprávnení, vynucujeme ho na serveri a podporujeme bezpečnými sessions, validáciou a auditovateľnými záznamami.',
      },
    ],
    updatedAt: '2026-08-26',
  },
  'ai-interfaces': {
    seoTitle: 'Vývoj AI rozhraní a RAG frontendov | EUHub',
    seoDescription:
      'Bezpečné rozhrania pre AI asistentov, RAG a copilots pre tímy v EÚ, so streamingom, citáciami, kontrolou a produkčnou integráciou.',
    definition:
      'Vývoj AI rozhrania mení model alebo vyhľadávací systém na použiteľný a kontrolovaný produkt. Zahŕňa konverzačné alebo workflow UI, streaming odpovedí, zobrazenie zdrojov, ľudskú kontrolu, oprávnenia, chybové stavy a bezpečné integrácie s existujúcimi internými firemnými systémami.',
    body: [
      'Užitočné AI rozhranie nie je len chat box pred API. Musí vysvetliť možnosti systému, ukázať neistotu a zdroje, vedome pracovať s kontextom a umožniť jednoduchú eskaláciu alebo opravu.',
      'Rozhranie navrhujeme spolu s hranicami retrievalu, nástrojov a oprávnení. Bezpečné spracovanie dokumentov, model routing, timeouty, fallbacky a human-in-the-loop kontrola sú viditeľným správaním produktu.',
      'Instrumentácia meria latenciu, náklady, použitie nástrojov a výsledky bez zbytočného zberu osobných údajov. Vytvára dôkazy pre zlepšovanie promptov, retrievalu a workflow pri zachovaní zrozumiteľnosti.',
    ],
    bestFor: [
      'Tímy, ktoré produktizujú interného asistenta alebo RAG systém',
      'Firmy pridávajúce AI do kontrolovaného dokumentového workflow',
      'Produkty, ktoré potrebujú transparentné zdroje a ľudskú kontrolu',
    ],
    outcomes: [
      'Jasné rozhranie pre možnosti, obmedzenia a kontrolné rozhodnutia',
      'Bezpečná práca s dokumentmi, oprávneniami a streamingom',
      'Prevádzková telemetria pre kvalitu, latenciu, cenu a adopciu',
    ],
    faq: [
      {
        question: 'Viete rozhranie pripojiť k nášmu AI backendu?',
        answer:
          'Áno. Integrujeme existujúci model gateway, RAG službu alebo workflow API a definujeme kontrakty pre streaming, citácie, nástroje a chyby.',
      },
      {
        question: 'Podporujete ľudskú kontrolu?',
        answer:
          'Áno. Stavy kontroly, schválenia, opravy a eskalácie môžu byť priamo vo workflow, aby dôsledky neobchádzali zodpovedných ľudí.',
      },
      {
        question: 'Ako riešite zlyhania AI?',
        answer:
          'Rozhranie používa jasné timeouty, obnoviteľné chyby, fallback modelov alebo nástrojov, viditeľnosť zdrojov a bezpečnú eskaláciu namiesto predstierania istoty.',
      },
    ],
    updatedAt: '2026-08-26',
  },
  redesign: {
    seoTitle: 'Redizajn webu a SEO bezpečná migrácia | EUHub',
    seoDescription:
      'SEO bezpečný redizajn a migrácia webu pre firmy v EÚ vrátane auditu obsahu, presmerovaní, moderného buildu a kontroly spustenia.',
    definition:
      'Redizajn a migrácia webu je riadená náhrada existujúceho webu pri zachovaní hodnotného obsahu, URL, vyhľadávacích signálov a biznis integrácií. Spája obsahové rozhodnutia, mapovanie presmerovaní, moderný vývoj a meranú kontrolu spustenia aj kritického obdobia po ňom.',
    body: [
      'Redizajn môže poškodiť viditeľnosť, ak považuje starý web za jednorazový. Najprv inventarizujeme indexovateľné URL, hodnotu vo vyhľadávaní, obsah, analytické udalosti, formuláre a integrácie.',
      'Náhradu staviame na udržiavateľnom systéme so self-canonical, jazykovými alternatívami, štruktúrovanými dátami a redirect mapou s jedným zodpovedným cieľom pre každú zrušenú URL. Staging zostáva noindex.',
      'Po release kontrolujeme status kódy, canonical ciele, sitemap, analytiku a prioritné konverzné cesty. Monitoring v Search Console a rollback kritériá robia migračné riziko pozorovateľným.',
    ],
    bestFor: [
      'Firmy, ktoré nahrádzajú pomalú, nebezpečnú alebo neudržateľnú platformu',
      'Tímy konsolidujúce domény, jazyky alebo duplicitný obsah',
      'Biznisy, ktoré si nemôžu dovoliť stratiť existujúci search demand',
    ],
    outcomes: [
      'Zdokumentovaný inventár a jednoznačná redirect stratégia',
      'Moderný build zachovávajúci prioritný obsah a zámer',
      'Merané spustenie s kontrolou vyhľadávania a konverzií',
    ],
    faq: [
      {
        question: 'Poškodí redizajn naše SEO?',
        answer:
          'Môže, ak sa URL, obsah a interné odkazy zmenia bez migračného plánu. Inventarizujeme súčasný web, mapujeme presmerovania a kontrolujeme nové signály.',
      },
      {
        question: 'Viete migrovať obsah z WordPressu?',
        answer:
          'Áno. Hodnotný obsah vieme auditovať a migrovať z WordPressu alebo iného CMS pri zachovaní potrebných médií, metadata a presmerovaní.',
      },
      {
        question: 'Ako overujete spustenie?',
        answer:
          'Crawlujeme prioritné URL, testujeme presmerovania a canonical, kontrolujeme sitemap, analytiku a konverzné cesty a sledujeme nečakané zmeny v Search Console.',
      },
    ],
    updatedAt: '2026-08-26',
  },
  integrations: {
    seoTitle: 'Vývoj API, CRM a ERP integrácií | EUHub',
    seoDescription:
      'Spoľahlivé API, CRM, ERP, platobné a logistické integrácie pre firmy v EÚ cez REST, GraphQL, webhooky a legacy SOAP s monitoringom.',
    definition:
      'Vývoj API a biznis integrácií prepája weby a aplikácie so systémami, ktoré riadia predaj, prevádzku, platby, logistiku a reporting. Zahŕňa dátové kontrakty, autentifikáciu, validáciu, retries, observabilitu a zodpovedné vlastníctvo všetkých produkčných chybových stavov a obnovy.',
    body: [
      'Integrácia je spoľahlivá až vtedy, keď je navrhnutý úspech aj zlyhanie. Pred spojením produkčných systémov dokumentujeme source of truth, mapovanie dát, autentifikáciu, rate limits, idempotenciu a obnovu.',
      'Podporujeme moderné REST, GraphQL a webhook rozhrania aj legacy SOAP služby, keď ich náhrada nie je praktická. Adapter hranica drží protokolovú komplexitu mimo používateľského rozhrania.',
      'Logy, metriky a alerty navrhujeme podľa biznis dôsledkov, nie iba HTTP statusu. Stratený lead, duplicitná platba alebo oneskorená logistická udalosť musia byť identifikovateľné a obnoviteľné.',
    ],
    bestFor: [
      'Weby, ktoré potrebujú prepojenie s CRM, ERP, platbami alebo logistikou',
      'Tímy nahrádzajúce manuálny prenos dát medzi systémami',
      'Produkty spájajúce moderné rozhrania s legacy SOAP',
    ],
    outcomes: [
      'Jasné vlastníctvo dát, kontrakty a validačné pravidlá',
      'Obnoviteľné doručenie s retries, idempotenciou a monitoringom',
      'Udržiavateľná adapter hranica okolo legacy závislostí',
    ],
    faq: [
      {
        question: 'Viete integrovať legacy SOAP API?',
        answer:
          'Áno. SOAP envelopes, autentifikáciu a mapovanie chýb izolujeme za moderným adaptérom, aby web alebo aplikácia neboli priamo závislé od protokolu.',
      },
      {
        question: 'Ako predchádzate duplicitným akciám?',
        answer:
          'Ak to cieľový systém podporuje, používame idempotency keys, stabilné identifikátory udalostí a replay-safe handlery s logmi pre oneskorené či duplicitné doručenie.',
      },
      {
        question: 'Kto integráciu monitoruje po spustení?',
        answer:
          'Monitoring a vlastníctvo dohodneme pred spustením. Retainer môže pokrývať alerty, incidenty, credentials, zmeny vendorov a riadené retries.',
      },
    ],
    updatedAt: '2026-08-26',
  },
  maintenance: {
    seoTitle: 'Údržba webov a DevOps podpora pre firmy | EUHub',
    seoDescription:
      'Údržba webov, hosting, CI/CD, monitoring, bezpečnostné aktualizácie a obnova pre firmy v EÚ, ktoré potrebujú dlhodobé vlastníctvo.',
    definition:
      'Údržba webu a DevOps podpora je priebežné technické vlastníctvo živého webu alebo aplikácie. Spája bezpečné doručovanie, monitoring, patching, zálohy, obnovu, kontrolu výkonu a riadené iterácie počas celej produkčnej životnosti systému vrátane incidentov a zmien závislostí.',
    body: [
      'Produkčný softvér sa mení aj bez viditeľnej zmeny rozhrania. Závislosti starnú, certifikáty a credentials rotujú, externé API sa vyvíjajú a návštevnosť odhaľuje správanie, ktoré staging neukáže.',
      'Používame opakovateľné CI/CD, oddelené prostredia, monitoring, logy a overovanie záloh. Bezpečnostné aktualizácie posudzujeme a nasadzujeme s rovnakou disciplínou ako produktové zmeny.',
      'Retainer môže zahŕňať aj kontrolu výkonu, validáciu analytiky a menšie produktové iterácie. Priority, zodpovednosti a reakčné očakávania sú vždy explicitné a pravidelne prehodnocované, takže starostlivosť nie je neurčitý support inbox.',
    ],
    bestFor: [
      'Tímy bez dedikovaného vlastníka produkčného webu',
      'Aplikácie vyžadujúce monitorované integrácie a pravidelné release',
      'Firmy, ktoré potrebujú disciplínu záloh, obnovy a bezpečnosti',
    ],
    outcomes: [
      'Opakovateľné release s jasným produkčným vlastníctvom',
      'Použiteľný monitoring, patching a postupy obnovy',
      'Prioritizovaná cesta pre výkonové a produktové zlepšenia',
    ],
    faq: [
      {
        question: 'Čo zahŕňa maintenance retainer?',
        answer:
          'Rozsah môže zahŕňať hosting, CI/CD, monitoring, aktualizácie závislostí a bezpečnosti, kontroly záloh, incidenty a dohodnutú kapacitu na menšie zlepšenia.',
      },
      {
        question: 'Viete prevziať web, ktorý ste nevyvíjali?',
        answer:
          'Zvyčajne áno, po technickej diagnostike. Najprv posúdime codebase, deployment, závislosti, prístupy, monitoring a riziko obnovy a potom definujeme zodpovedný rozsah.',
      },
      {
        question: 'Ako riešite urgentné problémy?',
        answer:
          'Reakčné očakávania, kontaktné cesty a podporované úrovne závažnosti dohodneme v scope. Monitoring poskytuje dôkazy potrebné na diagnostiku a prioritu incidentu.',
      },
    ],
    updatedAt: '2026-08-26',
  },
};

function sourceServices(locale: Locale): Service[] {
  return locale === 'sk' ? slovakServices.services : englishServices.services;
}

export function getServicePages(locale: Locale): ServicePageContent[] {
  const details = locale === 'sk' ? sk : en;
  return sourceServices(locale).map((service) => ({
    ...service,
    paths: pathsById[service.id],
    ...details[service.id],
  }));
}

export function getServicePageBySlug(
  locale: Locale,
  slug: string,
): ServicePageContent | undefined {
  return getServicePages(locale).find((page) => {
    const segments = page.paths[locale].split('/').filter(Boolean);
    return segments.at(-1) === slug;
  });
}
