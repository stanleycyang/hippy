'use strict'

import mocha from 'mocha'
import chai from 'chai'
import assert from 'assert'
import path from 'path'
import { exec, spawn } from 'child_process'
import fs from 'fs'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import request from 'supertest'

const srcPath = path.resolve(__dirname, '../bin/hippy.es6')
const tempDir = path.resolve(__dirname, '../temp')

describe('hippy', () => {
  mocha.before(function(done) {
    this.timeout(30000)
    cleanup(done)
  })

  mocha.after(function(done) {
    this.timeout(30000)
    cleanup(done)
  })

  describe('when no arguments are provided', () => {
    let dir
    mocha.before((done) => {
      createTestEnvironment((err, newDir) => {
        if (err) return done(err)
        dir = newDir
        done()
      })
    })

    it('should create basic component(s)', () => {
    
    })
  })



})

/*
 * @param { Function } callback
 */

function createTestEnvironment(callback) {
  let num = process.pid + Math.random()
  let dir = path.join(tempDir, ('app-' + num))

  mkdirp(dir, (err) => {
    if (err) return callback(err)
    callback(null, dir)
  })
}

/*
 * @param { String } dir
 * @param { Function } callback
 */

function cleanup(dir, callback) {
  if (typeof dir === 'function') {
    callback = dir
    dir = tempDir
  }

  rimraf(tempDir, (err) => {
    callback(err)
  })
}

function run(dir, args, callback) {
  let argv = [srcPath].concat(args)
  let exec = process.argv[0]
  let stderr = ''
  let stdout = ''

  let child = spawn(exec, argv, {
    cwd: dir
  })

  child.stdout.setEncoding('utf-8')
  child.stdout.on('data', function ondata(str) {
    stdout += str
  })
  child.stderr.setEncoding('utf-8')
  child.stderr.on('data', function ondata(str) {
    process.stderr.write(str)
    stderr += str
  })

  child.on('close', onclose)
  child.on('error', callback)

  function onclose(code) {
    let err = null

    try {
      assert.equal(stderr, '')
      assert.strictEqual(code, 0)
    } catch (e) {
      err = 3
    }

    callback(err, stdout.replace(/\x1b\[(\d+)m/g, '_color_$1_'))
  }

}
