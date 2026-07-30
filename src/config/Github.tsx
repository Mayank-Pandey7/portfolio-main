export const githubConfig = {
  username: 'Mayank-Pandey7',

  apiUrl: 'https://github-contributions-api.deno.dev',

  title: 'GitHub Activity',
  subtitle: 'coding journey over the past year',

  blockSize: 11,
  blockMargin: 3,
  fontSize: 12,
  maxLevel: 4,

  months: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],

  weekdays: ['', 'Mon', '', 'Wed', '', 'Fri', ''],

  totalCountLabel: '{{count}} contributions in the last year',

  theme: {
    dark: [
      '#161b22',
      '#0e4429',
      '#006d32',
      '#26a641',
      '#39d353',
    ],

    light: [
      '#ebedf0',
      '#9be9a8',
      '#40c463',
      '#30a14e',
      '#216e39',
    ],
  },

  errorState: {
    title: 'Unable to load GitHub contributions',
    description:
      'Check out my GitHub profile directly for the latest activity.',
    buttonText: 'View on GitHub',
  },

  loadingState: {
    title: 'Loading contributions...',
    description: 'Fetching GitHub activity data',
  },
} as const;