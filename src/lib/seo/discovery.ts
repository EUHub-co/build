import { getServicePages } from '../../content/service-pages';
import { productionSiteUrl } from './metadata';
import { seoPaths } from './paths';

export function buildLlmsTxt(): string {
  const english = getServicePages('en');
  const slovak = new Map(
    getServicePages('sk').map((service) => [service.id, service]),
  );
  const servicePairsApproved = english.every(
    (service) =>
      service.pairApproved && slovak.get(service.id)?.pairApproved === true,
  );
  const serviceSections = servicePairsApproved
    ? english
        .map((service) => {
          const sk = slovak.get(service.id);
          if (!sk) throw new Error(`Missing Slovak service ${service.id}`);
          return [
            `### ${service.title}`,
            '',
            service.definition,
            '',
            `- English: ${new URL(service.paths.en, productionSiteUrl).href}`,
            `- Slovak: ${new URL(sk.paths.sk, productionSiteUrl).href}`,
          ].join('\n');
        })
        .join('\n\n')
    : 'Bilingual service pages are pending native-language approval and are not included in search discovery yet.';
  const serviceCanonicalLinks = servicePairsApproved
    ? `- English services: ${new URL(seoPaths.services.en, productionSiteUrl).href}
- Slovak services: ${new URL(seoPaths.services.sk, productionSiteUrl).href}`
    : '';

  return `# Build with EUHub

> Web engineering studio for European businesses. We design and build modern websites, landing pages, custom web applications and AI-integrated interfaces with performance, security and business logic built in from day one.

## Canonical pages

- English home: ${new URL(seoPaths.home.en, productionSiteUrl).href}
- Slovak home: ${new URL(seoPaths.home.sk, productionSiteUrl).href}
${serviceCanonicalLinks}

## Services

${serviceSections}

## Organization

Build with EUHub is the web engineering unit in the EUHUB ecosystem. We work with businesses across the European Union.

## Related EUHUB properties

- EUHub: https://euhub.co/
- EUHub AI: https://ai.euhub.co/
- Grow with EUHub: https://grow.euhub.co/
- Deploy with EUHub: https://deploy.euhub.co/
- EUHub Community: https://community.euhub.co/

## Contact

- Email: hello@euhub-ai.com
- Location: Slovakia, European Union

## Evidence policy

Client identities, people, credentials, testimonials and performance results are published only when an accountable source has approved the underlying evidence. Public marketing pages may be indexed and cited.
`;
}
