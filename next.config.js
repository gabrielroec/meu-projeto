/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suas configurações aqui
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }]; // Ignore o módulo canvas no servidor

    // Adicione regras para resolver problemas com o Three.js
    config.resolve.alias = {
      ...config.resolve.alias,
      three: require.resolve("three"),
    };

    return config;
  },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

module.exports = nextConfig;
