import type { ProblemItem } from '../types';

const eyebrow = 'The real problem';

const problems: ProblemItem[] = [
  {
    title: 'Slow, outdated sites',
    body: 'Legacy websites that lose visitors before they read a word.',
  },
  {
    title: 'Weak conversion structure',
    body: 'No clear path guiding a visitor from click to lead.',
  },
  {
    title: 'No CRM or ERP integration',
    body: 'Leads trapped in scattered email threads instead of a pipeline.',
  },
  {
    title: 'No analytics discipline',
    body: 'Decisions made on guesswork instead of real user data.',
  },
  {
    title: 'No automation',
    body: 'Manual work repeated by hand until someone quits.',
  },
  {
    title: 'Poor mobile UX',
    body: 'A broken experience on the device most visitors actually use.',
  },
  {
    title: 'Poor SEO foundations',
    body: 'Invisible to the people already searching for you.',
  },
  {
    title: 'No technical ownership',
    body: 'Nobody left who actually knows how the site works.',
  },
  {
    title: 'No path to AI integration',
    body: 'Stuck on legacy foundations while competitors move ahead.',
  },
  {
    title: 'Fragile WordPress setups',
    body: 'Random plugins one update away from breaking the whole site.',
  },
];

export const problemBundle = { eyebrow, problems };
