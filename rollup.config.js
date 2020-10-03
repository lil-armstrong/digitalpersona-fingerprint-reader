import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

const { npm_package_globalObject } = {
    ...process.env
}
export default {
    input: 'src/index.js',
    external: ['@digitalpersona/devices'],
    output: [{
        format: 'umd',
        file: 'build/bundle.js',
        name: 'fpController',
        globals: {
            '@digitalpersona/devices': 'dp.devices',
        },
        sourcemap: true

    }],
    plugins: [
        resolve(),
        commonjs({

            esmExternals: true
        }),
        babel({ babelHelpers: 'bundled' })
    ]
}