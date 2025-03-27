/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suas configurações aqui
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }]; // Ignore o módulo canvas no servidor
    return config;
  },
};

module.exports = nextConfig;
