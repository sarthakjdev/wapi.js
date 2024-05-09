export const metaDescription = ''
export const PACKAGES = ['wapi.js']

export const OVERLOAD_SEPARATOR = ':'

export const METHOD_SEPARATOR = '#'

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

export const IS_STAGING = !IS_DEVELOPMENT && !IS_PRODUCTION
