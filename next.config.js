/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
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
})

module.exports = nextConfig
