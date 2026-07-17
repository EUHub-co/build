import type { ProblemItem } from '../types';

const eyebrow = 'The real problem';

const problems: ProblemItem[] = [
  {
    title: 'Slow, outdated sites',
    body: 'Legacy websites that lose visitors before they read a word.',
  },
  {
    title: 'Weak conversion structure',
    body: 'No clear path from visitor to qualified lead.',
  },
  {
    title: 'No CRM/ERP integration',
    body: 'Leads trapped in email threads, lost between systems.',
  },
  {
    title: 'No analytics discipline',
    body: 'Decisions made on guesswork, not measured data.',
  },
  {
    title: 'No automation',
    body: 'Manual work repeated until someone quits.',
  },
  {
    title: 'Poor mobile UX',
    body: 'Broken on the device most of your visitors actually use.',
  },
  {
    title: 'Weak SEO foundations',
    body: 'Invisible to the people already searching for you.',
  },
  {
    title: 'No technical ownership',
    body: 'Nobody knows how the site actually works.',
  },
  {
    title: 'No path to AI',
    body: 'Stuck on manual while competitors move faster.',
  },
  {
    title: 'Fragile WordPress',
    body: 'Random plugins one update away from breaking.',
  },
];

export const problemBundle = { eyebrow, problems };
