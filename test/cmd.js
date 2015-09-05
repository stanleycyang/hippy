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
