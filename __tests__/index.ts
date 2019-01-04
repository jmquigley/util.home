'use strict';

import * as _ from 'lodash';
import * as path from 'path';

const saveEnv = _.cloneDeep(process.env);

beforeEach(() => {
	jest.resetModules()
	process.env = _.cloneDeep(saveEnv);
});

test('Testing with bad directory source', () => {
	const expand = require('../index').expandHomeDirectory;
	const dir = expand(null);

	expect(dir).toBe('');
});

test('Testing expansion of directory without tilde on Windows', () => {
	const toolbox = require('util.toolbox');
	toolbox.isWin = true;
	toolbox.isMac = false;
	toolbox.isDarwin = false;
	toolbox.isLinux = false;

	process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

	const expand = require('../index').expandHomeDirectory;
	const dir = expand(`C:${path.sep}Users`);

	expect(dir).toBeTruthy();
	expect(dir).toBe('C:/Users');
});

test('Testing expansion of single tilde home on Windows', () => {
	const toolbox = require('util.toolbox');
	toolbox.isWin = true;
	toolbox.isMac = false;
	toolbox.isDarwin = false;
	toolbox.isLinux = false;

	process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

	const expand = require('../index').expandHomeDirectory;
	const dir = expand('~');

	expect(dir).toBeTruthy();
	expect(dir).toBe('C:/Users/Home');
});

test('Testing expansion of simple home on Windows', () => {
	const toolbox = require('util.toolbox');
	toolbox.isWin = true;
	toolbox.isMac = false;
	toolbox.isDarwin = false;
	toolbox.isLinux = false;

	process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

	const expand = require('../index').expandHomeDirectory;
	const dir = expand('~/');

	expect(dir).toBeTruthy();
	expect(dir).toBe('C:/Users/Home');
});

test('Testing alternate expansion of simple home on Windows', () => {
	const toolbox = require('util.toolbox');
	toolbox.isWin = true;
	toolbox.isMac = false;
	toolbox.isDarwin = false;
	toolbox.isLinux = false;

	process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

	const expand = require('../index').expandHomeDirectory;
	const dir = expand('~\\');

	expect(dir).toBeTruthy();
	expect(dir).toBe('C:/Users/Home');
});

test('Testing the expansion of home directory on Windows', () => {
	const toolbox = require('util.toolbox');
	toolbox.isWin = true;
	toolbox.isMac = false;
	toolbox.isDarwin = false;
	toolbox.isLinux = false;

	process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

	const expand = require('../index').expandHomeDirectory;
	const dir = expand('~/test/expand');

	expect(dir).toBeTruthy();
	expect(dir).toBe('C:/Users/Home/test/expand');
});

test('Testing the expansion of home directory on Windows with Buffer', () => {
	const toolbox = require('util.toolbox');
	toolbox.isWin = true;
	toolbox.isMac = false;
	toolbox.isDarwin = false;
	toolbox.isLinux = false;

	process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

	const expand = require('../index').expandHomeDirectory;
	const dir = expand(new Buffer('~/test/expand'));

	expect(dir).toBeTruthy();
	expect(dir).toBe('C:/Users/Home/test/expand');
});

test('Testing expansion of directory without tilde on Linux/Mac', () => {
	const toolbox = require('util.toolbox');
	toolbox.isWin = false;
	toolbox.isMac = true;
	toolbox.isDarwin = true;
	toolbox.isLinux = true;

	process.env['HOME'] = `${path.sep}home${path.sep}user`;

	const expand = require('../index').expandHomeDirectory;
	const dir = expand(`${path.sep}home`);

	expect(dir).toBeTruthy();
	expect(dir).toBe('/home');
});

test('Testing expansion of single tilde home on Linux/Mac', () => {
	const toolbox = require('util.toolbox');
	toolbox.isWin = false;
	toolbox.isMac = true;
	toolbox.isDarwin = true;
	toolbox.isLinux = true;

	process.env['HOME'] = `${path.sep}home${path.sep}user`;

	const expand = require('../index').expandHomeDirectory;
	const dir = expand('~');

	expect(dir).toBeTruthy();
	expect(dir).toBe('/home/user');
});

test('Testing expansion of simple home on Linux/Mac', () => {
	const toolbox = require('util.toolbox');
	toolbox.isWin = false;
	toolbox.isMac = true;
	toolbox.isDarwin = true;
	toolbox.isLinux = true;

	process.env['HOME'] = `${path.sep}home${path.sep}user`;

	const expand = require('../index').expandHomeDirectory;
	const dir = expand('~/');

	expect(dir).toBeTruthy();
	expect(dir).toBe('/home/user');
});

test('Testing alternate expansion of simple home on Linux/Mac', () => {
	const toolbox = require('util.toolbox');
	toolbox.isWin = false;
	toolbox.isMac = true;
	toolbox.isDarwin = true;
	toolbox.isLinux = true;

	process.env['HOME'] = `${path.sep}home${path.sep}user`;

	const expand = require('../index').expandHomeDirectory;
	const dir = expand('~\\');

	expect(dir).toBeTruthy();
	expect(dir).toBe('/home/user');
});

test('Testing the expansion of home directory on Linux/Mac', () => {
	const toolbox = require('util.toolbox');
	toolbox.isWin = false;
	toolbox.isMac = true;
	toolbox.isDarwin = true;
	toolbox.isLinux = true;

	process.env['HOME'] = `${path.sep}home${path.sep}user`;

	const expand = require('../index').expandHomeDirectory;
	const dir = expand('~/test/expand');

	expect(dir).toBeTruthy();
	expect(dir).toBe('/home/user/test/expand');
});

test('Testing the expansion of home directory on Linux/Mac with Buffer', () => {
	const toolbox = require('util.toolbox');
	toolbox.isWin = false;
	toolbox.isMac = true;
	toolbox.isDarwin = true;
	toolbox.isLinux = true;

	process.env['HOME'] = `${path.sep}home${path.sep}user`;

	const expand = require('../index').expandHomeDirectory;
	const dir = expand(new Buffer('~/test/expand'));

	expect(dir).toBeTruthy();
	expect(dir).toBe('/home/user/test/expand');
});
