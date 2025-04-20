/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  distDir: "build",
  output: "standalone",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    domains: ["songs-of-anhanga.netlify.app", "localhost"],
  },
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
};
export default nextConfig;
