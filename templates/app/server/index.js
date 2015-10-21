'use strict'

import path from 'path'
import express from 'express'
import home from './routes';

const app = express()

import { compiler, devConfig } from '../webpack'

// For development webpack purposes..
if (config.env === 'development') {

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: devConfig.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}

// Set up routes
app.use('/', home)

// Export the middleware to use
export default app

