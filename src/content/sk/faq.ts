import type { FaqItem } from '../types';

const faq: FaqItem[] = [
  {
    question: 'Robíte iba weby?',
    answer:
      'Nie. Staviame weby, vstupné stránky, webové aplikácie na mieru, prehľadové panely, portály a rozhrania s integrovanou AI — plus integrácie a infraštruktúru, ktorá za nimi stojí.',
  },
  {
    question:
      'Môžete postaviť webovú aplikáciu na mieru alebo prehľadový panel?',
    answer:
      'Áno. Interné nástroje, rezervačné systémy, prevádzkové prehľadové panely a klientske portály sú jadrom toho, čo robíme. Vyvíjame ich podľa vašich firemných pracovných postupov, bez obmedzení hotovej šablóny.',
  },
  {
    question: 'Môžete integrovať náš CRM/ERP?',
    answer:
      'Áno. Integrujeme s CRM, ERP, platobnými, e-mailovými, analytickými a logistickými systémami cez REST, GraphQL a SOAP v starších systémoch, keď je to potrebné — s webhookmi, tokmi udalostí a dôsledným spracovaním chýb.',
  },
  {
    question: 'Viete pracovať s SOAP API starších systémov?',
    answer:
      'Áno. Ak máte staršie systémy, ktoré sprístupňujú iba koncové body SOAP, postavíme integračnú vrstvu, ktorá prevádza komunikáciu medzi SOAP a moderným REST/GraphQL. Nenútime vás vyhodiť fungujúcu infraštruktúru.',
  },
  {
    question: 'Robíte AI funkcie?',
    answer:
      'Áno — používateľské rozhrania pre AI asistentov a RAG systémy, automatizované pracovné postupy a interných AI pomocníkov, so streamovanými odpoveďami, bezpečným spracovaním dokumentov a kontrolou človekom.',
  },
  {
    question: 'Môžete hostovať a udržiavať web?',
    answer:
      'Áno. Ponúkame mesačnú spoluprácu pokrývajúcu hosting, CI/CD, monitoring, bezpečnostné aktualizácie, zálohy a iterácie. Dlhodobé technické vlastníctvo je súčasťou ponuky od začiatku.',
  },
  {
    question: 'Zohľadňujete GDPR?',
    answer:
      'Áno. Architektúra zohľadňujúca GDPR je štandard: možnosti umiestnenia dát v EÚ, analytika bez cookies tam, kde je to možné, bezpečné formuláre, prístup podľa používateľských rolí a logovanie vhodné na audit.',
  },
  {
    question: 'Pracujete s firmami mimo Slovenska?',
    answer:
      'Áno. Sídlime na Slovensku a pracujeme s firmami po celej EÚ. Naše pôsobisko vám poskytuje umiestnenie dát v EÚ a zosúladenie s GDPR bez dodatočnej námahy.',
  },
  {
    question: 'Ako dlho trvá projekt webu?',
    answer:
      'Cielená vstupná stránka môže byť hotová za pár týždňov; kompletný web s integráciami zvyčajne trvá 6–12 týždňov. Diagnostika vám dá konkrétny harmonogram ešte pred začiatkom samotného vývoja.',
  },
  {
    question: 'Čo potrebujete od nás na štart?',
    answer:
      'Technický audit webu je bežný štartovací bod. Potrebujeme prístup k vášmu súčasnému webu, analytike (ak nejakú máte) a krátky rozhovor o vašich podnikateľských cieľoch. Zvyšok zvládneme my.',
  },
  {
    question: 'Ako oceňujete projekty?',
    answer:
      'Ceny odvodzujeme od rozsahu, integrácií, časového harmonogramu a dlhodobej údržby. Väčšina projektov začína technickým auditom s pevnou cenou (€500–€1,500), potom prechádza na projekt s pevným rozsahom alebo mesačnú spoluprácu.',
  },
  {
    question: 'Ponúkate priebežnú podporu po spustení?',
    answer:
      'Áno. Mesačná údržba a DevOps pokrývajú monitoring, bezpečnostné opravy, zálohy, sledovanie výkonu a nové funkcie podľa toho, ako sa vaše podnikanie vyvíja. Web, ktorý nikto neudržiava, sa stáva záťažou.',
  },
];

export const faqBundle = { faq };
