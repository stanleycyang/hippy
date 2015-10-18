#! /usr/bin/env babel-node
'use strict'

const program = require('commander')
const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const readline = require('readline-sync')
const colors = require('colors')

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
  if (typeof files === 'undefined') {
    console.error('no command given!'.red)
    process.exit(1)
  }

  console.log('\nStarting Hippy...\n'.random)

  for ( let file of files) {
    // Add the file extension
    file = file.replace(/\.(js|jsx)/g, '') + '.js'
    checkFilePath(file, createFile)
  }
}

/*
 * @param {String} path
 * @param {Function} fn
 */

function checkFilePath(path, fn) {
  try {
    let stats = fs.lstatSync(path)
    if (stats !== null && (program.force || confirm(`The file ${path} already exists. Overwrite? [y/N]`))) {
        // Overwrite
        fn(path)
    } else {
        console.error('abort overwrite'.red)
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
  let componentName = name.replace(/\.(js|jsx)|(\S+\/)/g, '')
  component = component.replace(/{name}/g, componentName)


  // Write the component
  write(name, component)
}

/*
 * @param {String} path
 * @param {String} str
 */

function write(path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || '0666' })
  console.log('created: '.green + path)
}

/*
 * Prompt for confirmation to force
 * @param {String} msg
 * @param {Function} fn
 */

function confirm(msg, fn) {
  let confirm = readline.question(msg)
  return /^y|yes|ok|true$/i.test(confirm)
}

/*
 * @param {String} name
 */

function loadTemplate(name) {
  return fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8')
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
