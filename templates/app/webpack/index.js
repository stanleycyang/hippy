// create compiler
export const devConfig = require('./dev.config')
export const compiler = require('webpack')(devConfig)
