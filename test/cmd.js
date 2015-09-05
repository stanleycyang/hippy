import assert from 'assert';
import { spawn, exec } from 'child_process';
import fs from 'fs';
import mkdirp from 'mkdirp';
import mocha from 'mocha';
import path from 'path';
import request from 'supertest';
import rimraf from 'rimraf'; // rm -rf for NodeJS

const binPath = path.resolve(__dirname, '../bin/express');
const tempDir = path.resolve(__dirname, '../temp');

describe('express(1)', () => {
  mocha.before( done => {
    this.timeout(30000);
    cleanup(done);
  });

  mocha.after( done => {
    this.timeout(30000);
    cleanup(done);
  });

  describe('(no args)', () => {
    let dir, files, output;

    mocha.before( done => {
    });
  });

});



/*
 * Clean up the directory after testing
 *
 * @param {String} dir
 * @param {Function} callback
 */

function cleanup(dir, callback) {
  if (typeof dir === 'function') {
    callback = dir;
    dir = tempDir;
  }

  rimraf(tempDir, error => {
    callback(error);
  });
}

function createEnvironment(callback) {
  let num = process.pid + Math.random();
  let dir = path.join(tempDir, ('app-' + num));

  mkdirp(dir, function ondir(error) {
    if(error) return callback(error);
    callback(null, dir);
  });
}

function parseCreatedFiles(output, dir) {
  let files = [];
  let lines = output.split(/[\r\n]+/);
  let match;

  for (let i = 0; i < lines.length; i++) {
    if ((match = /create.*?: (.*)$/.exec(lines[i]))) {
      let files = match[1];

      if (dir) {
        file = path.resolve(dir, file);
        file = path.relative(dir, file);
      }

      file = file.replace(/\\/g, '/');
      files.push(file);
    }
  }
  return files;
}

function run(dir, args, callback) {
}

function npmInstall(dir, callback) {
  exec('npm install', {cwd: dir}, (error, stderr) {
    if (error) {
      error.message += stderr;
      callback(error);
      return;
    }
    callback();
  });
}
