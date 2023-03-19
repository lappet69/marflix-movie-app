/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: ["api.themoviedb.org", "image.tmdb.org", "i.pinimg.com"],
  },
};
