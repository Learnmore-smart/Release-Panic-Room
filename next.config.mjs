/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/release-panic-room',
  assetPrefix: '/release-panic-room/',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/release-panic-room',
  },
};

export default nextConfig;
