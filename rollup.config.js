import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

const plugins = [
  commonjs(),
  filesize(),
  json(),
  nodeResolve({
    preferBuiltins: true
  }),
  production && terser(),
  typescript({
    allowSyntheticDefaultImports: true,
    moduleResolution: 'node',
    resolveJsonModule: true,
  })
];

export default [
  {
    input: 'src/browse.ts',
    output: {
      dir: 'lib',
      exports: 'default',
      format: 'cjs',
      sourcemap: production ? false : true
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
