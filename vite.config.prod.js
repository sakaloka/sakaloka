import baseConfig from './vite.config.base.js';

export default {
  ...baseConfig,
  mode: 'production',
  build: {
    ...baseConfig.build,
    minify: true,
    sourcemap: false,
  },
};
