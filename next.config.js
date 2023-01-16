/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos", "cdn.sanity.io"],
  },
  reactStrictMode: true,
  i18n: {
    locales: ["de-CH", "fr-CH", "it-CH"],
    defaultLocale: "de-CH",
  },
};

module.exports = nextConfig;
