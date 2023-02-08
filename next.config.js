const withLess = require('next-with-less')

const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const plugins = [bundleAnalyzer, withLess]

/** @type {import('next').NextConfig} */
const bookstairsConfig = {
  reactStrictMode: false,
  images: {
    domains: ['qiniu.suemor.com'],
  },
}

module.exports = plugins.reduce(
  (config, plugin) => plugin(config),
  bookstairsConfig,
)
