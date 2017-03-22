'use strict';

import test from 'ava';
import * as _ from 'lodash';
import * as path from 'path';

let saveEnv = _.cloneDeep(process.env);

test.beforeEach(() => {
	process.env = _.cloneDeep(saveEnv);
	delete require.cache[require.resolve('./index')];
	delete require.cache[require.resolve('util.toolbox')];
});

test('Testing with bad directory source', t => {
	let expand = require('./index').expandHomeDirectory;
	let dir = expand(null);
	t.is(dir, '');
});

test('Testing expansion of directory without tilde on Windows', t => {
	let toolbox = require('util.toolbox');
	toolbox.isWin = true;
	toolbox.isMac = false;
	toolbox.isDarwin = false;
	toolbox.isLinux = false;

	process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

	let expand = require('./index').expandHomeDirectory;
	let dir = expand(`C:${path.sep}Users`);

	t.truthy(dir);
	t.is(dir, 'C:/Users');
});

test('Testing expansion of single tilde home on Windows', t => {
	let toolbox = require('util.toolbox');
	toolbox.isWin = true;
	toolbox.isMac = false;
	toolbox.isDarwin = false;
	toolbox.isLinux = false;

	process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

	let expand = require('./index').expandHomeDirectory;
	let dir = expand('~');

	t.truthy(dir);
	t.is(dir, 'C:/Users/Home');
});

test('Testing expansion of simple home on Windows', t => {
	let toolbox = require('util.toolbox');
	toolbox.isWin = true;
	toolbox.isMac = false;
	toolbox.isDarwin = false;
	toolbox.isLinux = false;

	process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

	let expand = require('./index').expandHomeDirectory;
	let dir = expand('~/');

	t.truthy(dir);
	t.is(dir, 'C:/Users/Home');
});

test('Testing alternate expansion of simple home on Windows', t => {
	let toolbox = require('util.toolbox');
	toolbox.isWin = true;
	toolbox.isMac = false;
	toolbox.isDarwin = false;
	toolbox.isLinux = false;

	process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

	let expand = require('./index').expandHomeDirectory;
	let dir = expand('~\\');

	t.truthy(dir);
	t.is(dir, 'C:/Users/Home');
});

test('Testing the expansion of home directory on Windows', t => {
	let toolbox = require('util.toolbox');
	toolbox.isWin = true;
	toolbox.isMac = false;
	toolbox.isDarwin = false;
	toolbox.isLinux = false;

	process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

	let expand = require('./index').expandHomeDirectory;
	let dir = expand('~/test/expand');

	t.truthy(dir);
	t.is(dir, 'C:/Users/Home/test/expand');
});

test('Testing the expansion of home directory on Windows with Buffer', t => {
	let toolbox = require('util.toolbox');
	toolbox.isWin = true;
	toolbox.isMac = false;
	toolbox.isDarwin = false;
	toolbox.isLinux = false;

	process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

	let expand = require('./index').expandHomeDirectory;
	let dir = expand(new Buffer('~/test/expand'));

	t.truthy(dir);
	t.is(dir, 'C:/Users/Home/test/expand');
});

test('Testing expansion of directory without tilde on Linux/Mac', t => {
	let toolbox = require('util.toolbox');
	toolbox.isWin = false;
	toolbox.isMac = true;
	toolbox.isDarwin = true;
	toolbox.isLinux = true;

	process.env['HOME'] = `${path.sep}home${path.sep}user`;

	let expand = require('./index').expandHomeDirectory;
	let dir = expand(`${path.sep}home`);

	t.truthy(dir);
	t.is(dir, '/home');
});

test('Testing expansion of single tilde home on Linux/Mac', t => {
	let toolbox = require('util.toolbox');
	toolbox.isWin = false;
	toolbox.isMac = true;
	toolbox.isDarwin = true;
	toolbox.isLinux = true;

	process.env['HOME'] = `${path.sep}home${path.sep}user`;

	let expand = require('./index').expandHomeDirectory;
	let dir = expand('~');

	t.truthy(dir);
	t.is(dir, '/home/user');
});

test('Testing expansion of simple home on Linux/Mac', t => {
	let toolbox = require('util.toolbox');
	toolbox.isWin = false;
	toolbox.isMac = true;
	toolbox.isDarwin = true;
	toolbox.isLinux = true;

	process.env['HOME'] = `${path.sep}home${path.sep}user`;

	let expand = require('./index').expandHomeDirectory;
	let dir = expand('~/');

	t.truthy(dir);
	t.is(dir, '/home/user');
});

test('Testing alternate expansion of simple home on Linux/Mac', t => {
	let toolbox = require('util.toolbox');
	toolbox.isWin = false;
	toolbox.isMac = true;
	toolbox.isDarwin = true;
	toolbox.isLinux = true;

	process.env['HOME'] = `${path.sep}home${path.sep}user`;

	let expand = require('./index').expandHomeDirectory;
	let dir = expand('~\\');

	t.truthy(dir);
	t.is(dir, '/home/user');
});

test('Testing the expansion of home directory on Linux/Mac', t => {
	let toolbox = require('util.toolbox');
	toolbox.isWin = false;
	toolbox.isMac = true;
	toolbox.isDarwin = true;
	toolbox.isLinux = true;

	process.env['HOME'] = `${path.sep}home${path.sep}user`;

	let expand = require('./index').expandHomeDirectory;
	let dir = expand('~/test/expand');

	t.truthy(dir);
	t.is(dir, '/home/user/test/expand');
});

test('Testing the expansion of home directory on Linux/Mac with Buffer', t => {
	let toolbox = require('util.toolbox');
	toolbox.isWin = false;
	toolbox.isMac = true;
	toolbox.isDarwin = true;
	toolbox.isLinux = true;

	process.env['HOME'] = `${path.sep}home${path.sep}user`;

	let expand = require('./index').expandHomeDirectory;
	let dir = expand(new Buffer('~/test/expand'));

	t.truthy(dir);
	t.is(dir, '/home/user/test/expand');
});