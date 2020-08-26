import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  commonjs(),
  nodeResolve({
    preferBuiltins: true
  }),
  terser(),
  typescript({
    allowSyntheticDefaultImports: true
  })
];

export default [
  {
    input: 'src/browse.ts',
    output: {
      dir: 'lib',
      format: 'cjs',
      sourcemap: true
    },
    external: [
      'atom',
      'electron'
    ],
    plugins: plugins
  }
];
