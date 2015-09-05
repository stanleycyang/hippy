import mocha from 'mocha';
import chai from 'chai';
import assert from 'assert';
import path from 'path';
import { exec, spawn } from 'child_process';
import fs from 'fs';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import request from 'supertest';

const binPath = path.resolve(__dirname, '../bin/express');
const tempDir = path.resolve(__dirname, '../temp');

