import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/material-zero.js',
    output: {
        name: "MaterialZero",
        file: 'dist/js/material-zero.min.js',
        format: 'umd', // universal module definition - works as `amd`, `cjs` and `iife`
        sourcemap: true
    },
    plugins: [
        babel({ babelHelpers: 'bundled' }),
        production && terser({ compress: true, mangle: true }) // minify, but only in production
    ]
};
