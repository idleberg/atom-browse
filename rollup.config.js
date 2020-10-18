import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  commonjs(),
  filesize(),
  nodeResolve({
    preferBuiltins: true
  }),
  terser(),
  typescript({
    allowSyntheticDefaultImports: true,
    sourceMap: true
  })
];

export default [
  {
    input: 'src/browse.ts',
    output: {
      dir: 'lib',
      exports: 'default',
      format: 'cjs',
      sourcemap: true
    },
    external: [
      'atom',
      'child_process',
      'electron',
      'fs',
      'os',
      'path',
      'util'
    ],
    plugins: plugins
  },

];
