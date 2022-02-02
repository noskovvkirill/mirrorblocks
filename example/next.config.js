/** @type {import('next').NextConfig} */

const path = require('path')

// next.config.js
const nextConfig = {
  webpack: (config, options) => {
    // modify the `config` here

    if (options.isServer) {
      config.externals = ["react", ...config.externals];
    }
    config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');
    config.resolve.alias['react-dom'] = path.resolve(__dirname, '.', 'node_modules', 'react-dom');
    return config;
  },
};
// more 


module.exports = nextConfig
