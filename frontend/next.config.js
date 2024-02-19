// next.config.js

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "source.unsplash.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "cdn.pixabay.com" },
      { hostname: "i.ibb.co" },
      { hostname: "images.pexels.com" },
      { hostname: "unsplash.com" },
      { hostname: "plus.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;