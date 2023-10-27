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
  eslint: {
    dirs: ['src', 'cypress'],
  },
};

module.exports = nextConfig;
