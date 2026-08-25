export type PerformanceEvidence =
  | {
      status: 'pending';
      target: string;
      requestedAt: string;
      method: {
        tool: 'Lighthouse';
        runs: number;
        strategy: 'mobile' | 'desktop';
      };
    }
  | {
      status: 'verified';
      target: string;
      capturedAt: string;
      approvedAt: string;
      reportUrl: string;
      method: {
        tool: 'Lighthouse';
        runs: number;
        strategy: 'mobile' | 'desktop';
      };
      scores: {
        performance: number;
        accessibility: number;
        bestPractices: number;
        seo: number;
      };
    };

export const performanceEvidence: PerformanceEvidence = {
  status: 'pending',
  target: 'https://build.euhub.co/',
  requestedAt: '2026-08-26',
  method: {
    tool: 'Lighthouse',
    runs: 3,
    strategy: 'mobile',
  },
};

export function shouldIndexEvidence(
  evidence: PerformanceEvidence,
): evidence is Extract<PerformanceEvidence, { status: 'verified' }> {
  return evidence.status === 'verified';
}
