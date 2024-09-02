import posthog from 'posthog-js';

if (process.env.NODE_ENV === 'production') {
  posthog.init('phc_WpJw40xWNMEh6QuqBiUCiy7X3zXFvlOH0R1ozIpbRng', {
    api_host: 'https://app.posthog.com',
  });
}

export { posthog };
