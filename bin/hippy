#! /usr/bin/env babel-node
'use strict'

const program = require('commander')
const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const readline = require('readline')

let exit = process.exit

// Grab the version from package.json
const version = require('../package.json').version

process.exit = exit

// Files
let files

program
  .version(version)
  .option('-f, --force', 'force on a pre-existing file')
  .command('g <file> [otherFiles...]')
  .action((file, otherFiles) => {
    otherFiles.unshift(file)
    files = otherFiles
  })

program.parse(process.argv)

if (!exit.exited) {
  // Execute the main program
  main()
}

/*
 * Main program
 */

function main() {
  console.log('Starting Hippy...')

  for ( var file of files) {
    checkFilePath(file, createFile)
  }
}

/*
 * @param {String} path
 * @param {Function} fn
 */

function checkFilePath(path, fn) {
  try {
    stats = fs.lstatSync(path)
    if (stats === null) {
      if (program.force) {
        fn(path)
      } else {
        // Ask for permission
        confirm(`The file ${path} already exists. Overwrite? [y/N]`, (ok) => {
          if (ok) {
            process.stdin.destroy()
            fn(path)
          } else {
            console.error('abort')
            exit(1)
          }
        })
      }
    }
  } catch(e) {
    switch (e.code) {
      case 'ENOENT':
        // Safe to write
        fn(path)
        break
      default:
        throw e
    }
  }
}

/*
 * @param {String} name
 */

function createFile(name) {
  let component = loadTemplate('Component.js')
  component = component.replace('{name}', name)

  // Write the component
  write(name, component)
}

/*
 * Prompt for confirmation to force
 * @param {String} msg
 * @param {Function} callback
 */

function confirm(msg, callback) {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question(msg, (input) => {
    rl.close()
    callback(/^y|yes|ok|true$/i.test(input));
  })
}

/*
 * @param {String} name
 */

function loadTemplate(name) {
  return fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8')
}

/*
 * @param {String} path
 * @param {String} str
 */

function write(path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || '0666' })
  console.log('\x1b[36mcreated\x1b[0m: ' + path)
}

/**
 * Graceful exit
 */

function exit(code) {
  function done() {
    if (!(draining--)) _exit(code);
  }

  var draining = 0;
  var streams = [process.stdout, process.stderr];

  exit.exited = true;

  streams.forEach(function(stream){
    // submit empty write request and wait for completion
    draining += 1;
    stream.write('', done);
  });

  done();
}
