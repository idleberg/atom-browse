const { createPlugins } = require('rollup-plugin-atomic')

const plugins = createPlugins(['ts', 'json', 'babel', 'terser'])

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      dir: 'lib',
      exports: 'default',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  external: [
    // Atom
    'atom',
    'electron',

    // Node
    'assert',
    'buffer',
    'child_process',
    'events',
    'fs',
    'os',
    'path',
    'stream',
    'util'
  ],
  plugins: plugins
}
