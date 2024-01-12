/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})


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
