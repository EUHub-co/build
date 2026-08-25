module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist/client',
      url: [
        'http://localhost/',
        'http://localhost/sk/',
        'http://localhost/services/',
        'http://localhost/services/business-websites/',
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--headless --no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
      },
    },
  },
};
