import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'app/main-prod.js',
    dest: 'compiled/build.js', // output a single application bundle
    sourceMap: false,
    format: 'iife',
    plugins: [
        nodeResolve({jsnext: true, module: true}),
        commonjs({
            include: 'node_modules/rxjs/**',
        })
    ]
}