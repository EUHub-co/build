import type { Locale } from '../content/types';
import { siteBundle as enSite } from '../content/en/site';
import { problemBundle as enProblem } from '../content/en/problem';
import { servicesBundle as enServices } from '../content/en/services';
import { processBundle as enProcess } from '../content/en/process';
import { techStackBundle as enTechStack } from '../content/en/tech-stack';
import { exampleScenariosBundle as enExamples } from '../content/en/example-scenarios';
import { engagementModelsBundle as enEngagement } from '../content/en/engagement-models';
import { faqBundle as enFaq } from '../content/en/faq';
import { ecosystemBundle as enEcosystem } from '../content/en/ecosystem';
import { legalBundle as enLegal } from '../content/en/legal';
import { uiBundle as enUi } from '../content/en/ui';
import { siteBundle as skSite } from '../content/sk/site';
import { problemBundle as skProblem } from '../content/sk/problem';
import { servicesBundle as skServices } from '../content/sk/services';
import { processBundle as skProcess } from '../content/sk/process';
import { techStackBundle as skTechStack } from '../content/sk/tech-stack';
import { exampleScenariosBundle as skExamples } from '../content/sk/example-scenarios';
import { engagementModelsBundle as skEngagement } from '../content/sk/engagement-models';
import { faqBundle as skFaq } from '../content/sk/faq';
import { ecosystemBundle as skEcosystem } from '../content/sk/ecosystem';
import { legalBundle as skLegal } from '../content/sk/legal';
import { uiBundle as skUi } from '../content/sk/ui';

const enBundle = {
  site: enSite,
  problem: enProblem,
  services: enServices,
  process: enProcess,
  techStack: enTechStack,
  examples: enExamples,
  engagement: enEngagement,
  faq: enFaq,
  ecosystem: enEcosystem,
  legal: enLegal,
  ui: enUi,
};

const skBundle = {
  site: skSite,
  problem: skProblem,
  services: skServices,
  process: skProcess,
  techStack: skTechStack,
  examples: skExamples,
  engagement: skEngagement,
  faq: skFaq,
  ecosystem: skEcosystem,
  legal: skLegal,
  ui: skUi,
};

export type ContentBundle = typeof enBundle;

export function getContent(locale: Locale): ContentBundle {
  return locale === 'sk' ? skBundle : enBundle;
}
