/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
      domains: [
        'assets.vercel.com',
        'dummyimage.com',
        'googleusercontent.com',
        'avatars.githubusercontent.com',
        'firebasestorage.googleapis.com/',
        'flowbite.com',
        'source.unsplash.com',
        'picsum.photos',
        'static.xx.fbcdn.net',
        "cdn.dribbble.com",
        "images.unsplash.com",
        "www.gravatar.com"
      ],
    },
    env: {
      API_URL: 'http://localhost:5000',
    },
}

module.exports = nextConfig
