import type { FaqItem } from '../types';

const faq: FaqItem[] = [
  {
    question: 'Robíte iba weby?',
    answer:
      'Nie. Staviame weby, landing pages, custom webové aplikácie, dashboardy, portály a AI-integrované rozhrania — plus integrácie a infraštruktúru, ktorá za nimi stojí.',
  },
  {
    question: 'Môžete postaviť custom web app alebo dashboard?',
    answer:
      'Áno. Interné nástroje, rezervačné systémy, operačné dashboardy a klientske portály sú jadrom toho, čo robíme. Sú engineeringované pre vaše biznis workflowy, nie narazené na šablónu.',
  },
  {
    question: 'Môžete integrovať náš CRM/ERP?',
    answer:
      'Áno. Integrujeme s CRM, ERP, platobnými, emailovými, analytickými a logistickými systémami cez REST, GraphQL a legacy SOAP, keď je to potrebné — s webhookmi, event flow a poriadnym error handlingom.',
  },
  {
    question: 'Viete pracovať s legacy SOAP API?',
    answer:
      'Áno. Ak máte legacy systémy, ktoré exposesujú len SOAP endpointy, postavíme integračnú vrstvu, ktorá translátuje medzi SOAP a moderným REST/GraphQL. Nenútime vás vyhodiť fungujúcu infraštruktúru.',
  },
  {
    question: 'Robíte AI funkcie?',
    answer:
      'Áno — frontendy pre AI asistentov a RAG systémy, automatizačné workflow a interné copiloty, so streamovanými odpoveďami, bezpečným spracovaním dokumentov a human-in-the-loop kontrolou.',
  },
  {
    question: 'Môžete hostovať a udržiavať web?',
    answer:
      'Áno. Ponúkame mesačné retainery pokrývajúce hosting, CI/CD, monitoring, bezpečnostné updaty, backupy a iterácie. Dlhodobé technické vlastníctvo je súčasťou ponuky, nie dodatočná myšlienka.',
  },
  {
    question: 'Ste GDPR-aware?',
    answer:
      'Áno. GDPR-aware architektúra je štandard: možnosti EU data residency, cookieless analytika tam, kde je to možné, bezpečné formuláre, role-based prístup a audit-friendly logovanie.',
  },
  {
    question: 'Pracujete s firmami mimo Slovenska?',
    answer:
      'Áno. Sídlime na Slovensku a pracujeme s firmami po celej EÚ. Lokácia vám dáva EU data residency a GDPR alignment bez extra námahy.',
  },
  {
    question: 'Ako dlho trvá projekt webu?',
    answer:
      'Cielená landing page vie byť hotová za pár týždňov; kompletný web s integráciami zvyčajne trvá 6–12 týždňov. Diagnostika vám dá konkrétny harmonogram ešte pred začiatkom samotnej stavby.',
  },
  {
    question: 'Čo potrebujete od nás na štart?',
    answer:
      'Technický web audit je bežný štartovací bod. Potrebujeme prístup k vášmu súčasnému webu, analytike (ak nejakú máte) a krátky call o vašich biznis cieľoch. Zvyšok zvládneme my.',
  },
  {
    question: 'Ako oceňujete projekty?',
    answer:
      'Ceny odvodzujeme od scopu, integrácií, časového harmonogramu a dlhodobej údržby. Väčšina projektov začína fixným technickým auditom (€500–€1,500), potom prechádza na fixný projekt alebo mesačný retainer.',
  },
  {
    question: 'Ponúkate priebežnú podporu po launche?',
    answer:
      'Áno. Retainery údržby a DevOps pokrývajú monitoring, security patching, backupy, sledovanie výkonu a nové funkcie podľa toho, ako sa váš biznis vyvíja. Web, ktorý nikto neudržiava, sa stáva záťažou.',
  },
];

export const faqBundle = { faq };
