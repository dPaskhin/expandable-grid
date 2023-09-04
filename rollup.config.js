const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  input: './src/main/index.ts',
  plugins: [typescript({ outputToFilesystem: true }), terser()],
  external: ['react'],
  output: [
    {
      file: './lib/index.cjs',
      format: 'cjs',
    },
    {
      file: './lib/index.js',
      format: 'es',
    },
  ],
};
