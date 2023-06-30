import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

// import packageJson from './package.json' assert { type: 'json' };
const packageJson = require('./package.json');

export default {
  input: 'src/packageExports/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      interop: 'auto',
    },
    {
      file: packageJson.module,
      format: 'esm',
      interop: 'auto',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
  ],
};
