/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ['ru', 'kg',],
    defaultLocale: 'ru',
    localeDetection: false,
  },
  images: {
    domains: ['online-back-8jc6.onrender.com'],
  },
  reactStrictMode: true, 
  swcMinify: true, 
})

module.exports = nextConfig
