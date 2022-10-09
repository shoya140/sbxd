/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SBX_PROJECT_ID: process.env.SBX_PROJECT_ID,
  },
}

module.exports = nextConfig
