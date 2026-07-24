const DEFAULT_ALLOWED_ORIGINS = [
  'https://www.lakshautomations.in',
  'https://lakshautomations.in',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

const isLocalHost = (host = '') =>
  host === 'localhost' ||
  host === '127.0.0.1' ||
  host.startsWith('localhost:') ||
  host.startsWith('127.0.0.1:');

const normalizeOrigin = (origin) => String(origin || '').trim().replace(/\/$/, '');

const parseOrigins = (value) =>
  String(value || '')
    .split(/[\n,]/)
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean);

const buildAllowedOrigins = () => {
  const origins = new Set(DEFAULT_ALLOWED_ORIGINS.map(normalizeOrigin));

  parseOrigins(process.env.CLIENT_URL).forEach((origin) => origins.add(origin));
  parseOrigins(process.env.CLIENT_URLS).forEach((origin) => origins.add(origin));
  parseOrigins(process.env.ALLOWED_ORIGINS).forEach((origin) => origins.add(origin));

  return origins;
};

module.exports = {
  buildAllowedOrigins,
  isLocalHost,
  normalizeOrigin,
  parseOrigins
};
