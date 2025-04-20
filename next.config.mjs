/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  basePath: "",
  images: {
    domains: ["songs-of-anhanga.netlify.app", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "songs-of-anhanga.netlify.app",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};
export default nextConfig;
