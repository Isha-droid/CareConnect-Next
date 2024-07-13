// next.config.js

const nextConfig = {
    webpack: (config, { isServer }) => {
      // Only modify webpack config for the server-side build
      if (isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
        };
      }
  
      return config;
    },
  };
  
  module.exports = nextConfig;
  