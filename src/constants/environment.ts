export const ENVIRONMENT = {
  GATHER_OAUTH_URL:
    import.meta.env.VITE_GATHER_OAUTH_URL || 'http://localhost:3001/api/requestPermission',
  OPENAI_COMPLETION_URL:
    import.meta.env.VITE_OPENAI_COMPLETION_URL || 'http://localhost:3001/api/v1/openAI/completion',
  AMAZON_ASIN_URL:
    import.meta.env.VITE_OPENAI_AMAZON_ASIN_URL ||
    'http://localhost:3001/api/v1/amazon-asin/product',
  AMAZON_ENABLE_ASIN_API: import.meta.env.VITE_OPENAI_AMAZON_ENABLE_ASIN_API === 'true' || false,
  PUBLIC_SENTRY_DSN: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  NODE_ENV: import.meta.env.VITE_NODE_ENV,
  OAUTH2_REFRESH_TOKEN_URL: import.meta.env.VITE_GATHER_OAUTH2_REFRESH_TOKEN,
  GATHER_AUTH_URL: import.meta.env.VITE_GATHER_AUTH_URL,
};
