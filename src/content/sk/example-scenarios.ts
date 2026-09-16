import type { ExampleScenario } from '../types';

const eyebrow = 'Príklady';

const exampleScenarios: ExampleScenario[] = [
  {
    id: 'logistics',
    sector: 'Logistická firma',
    problem:
      'Zastaraný web s manuálnymi požiadavkami na cenovú ponuku. Žiadna CRM integrácia. Dopyty sa strácali v e-mailoch.',
    solution:
      'Moderná vstupná stránka, štruktúrovaný formulár cenovej ponuky, CRM integrácia a interný prehľadový panel na sledovanie požiadaviek.',
    result:
      'Rýchlejšie spracovanie dopytov, prehľadnejšie procesy a jeden spoľahlivý zdroj informácií pre obchodný tím.',
    isExample: true,
  },
  {
    id: 'medical-services',
    sector: 'Medicínske / logistické služby',
    problem:
      'Roztrieštená interná komunikácia medzi tímami. Dokumenty spracovávané manuálne bez auditnej stopy.',
    solution:
      'Bezpečný portál s prehľadovými panelmi podľa používateľských rolí, AI podporovaným spracovaním dokumentov a kontrolou človekom.',
    result:
      'Menej manuálnej koordinácie, jasnejšia zodpovednosť a auditná stopa, ktorú možno doložiť.',
    isExample: true,
  },
  {
    id: 'b2b-services',
    sector: 'B2B služby',
    problem:
      'Nízka dôvera a slabá konverzia. Nesystematická práca s analytikou. Žiadna jasná cesta od návštevníka k kvalifikovanému záujemcovi.',
    solution:
      'Prémiový web so SEO štruktúrou, analytikou, procesom získavania záujemcov a kvalifikačným kontaktným formulárom.',
    result:
      'Lepšie kvalifikované prichádzajúce dopyty a merateľná cesta od návštevnosti po obchodné príležitosti.',
    isExample: true,
  },
];

export const exampleScenariosBundle = { eyebrow, exampleScenarios };
