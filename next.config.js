/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental: {
  //   newNextLinkBehavior: true,
  //   scrollRestoration: true,
  //   images: {
  //     allowFutureImage: true,
  //   },
  // },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  env: {
    TESTNET_URL: 'https://horizon-testnet.stellar.org',
    FRIENDBOT_URL: `https://friendbot.stellar.org`,
  },
  eslint: {
    dirs: ['src', 'cypress'],
  },
};

module.exports = nextConfig;
