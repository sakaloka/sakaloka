import baseConfig from './vite.config.base.js';

export default {
  ...baseConfig,
  mode: 'development',
  server: {
    port: 3000,
    open: true,
  },
};
