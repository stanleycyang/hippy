'use strict'

exports.port = process.env.PORT || 3000
exports.env = process.env.NODE_ENV || 'development'
exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hippy' // TODO: Change this

