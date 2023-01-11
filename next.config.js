/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["de-CH", "fr-CH", "it-CH"],
    defaultLocale: "de-CH",
  },
};

module.exports = nextConfig;
