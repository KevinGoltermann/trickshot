/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'picsum.photos',
      'lh3.googleusercontent.com'
    ],
  }
}

module.exports = nextConfig
