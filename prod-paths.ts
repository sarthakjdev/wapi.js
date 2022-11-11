/* eslint-disable @typescript-eslint/no-var-requires */

import tsConfigPaths from 'tsconfig-paths'

import tsConfig from './tsconfig.base.json'

const baseUrl = './lib' // Either absolute or relative path. If relative it's resolved to current working directory.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cleanup = tsConfigPaths.register({
    baseUrl,
    paths: tsConfig.compilerOptions.paths,
})

// When path registration is no longer needed
// cleanup();
