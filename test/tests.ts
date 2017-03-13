'use strict';

import * as path from 'path';
import * as assert from 'assert';
import * as _ from 'lodash';

let saveEnv = _.cloneDeep(process.env);

describe('Executing test suite', () => {

	beforeEach(() => {
		process.env = _.cloneDeep(saveEnv);
		delete require.cache[require.resolve('../index')];
		delete require.cache[require.resolve('util.toolbox')];
	});

	it('Testing with bad directory source', () => {
		let expand = require('../index').expandHomeDirectory;
		let dir = expand(null);
		assert(dir === '');
	});

	it('Testing expansion of directory without tilde on Windows', () => {
		let toolbox = require('util.toolbox');
		toolbox.isWin = true;
		toolbox.isMac = false;
		toolbox.isDarwin = false;
		toolbox.isLinux = false;

		process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

		let expand = require('../index').expandHomeDirectory;
		let dir = expand(`C:${path.sep}Users`);

		assert(dir);
		assert(dir === `C:${path.sep}Users`);
	});

	it('Testing expansion of single tilde home on Windows', () => {
		let toolbox = require('util.toolbox');
		toolbox.isWin = true;
		toolbox.isMac = false;
		toolbox.isDarwin = false;
		toolbox.isLinux = false;

		process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

		let expand = require('../index').expandHomeDirectory;
		let dir = expand('~');

		assert(dir);
		assert(dir === `C:${path.sep}Users${path.sep}Home`);
	});

	it('Testing expansion of simple home on Windows', () => {
		let toolbox = require('util.toolbox');
		toolbox.isWin = true;
		toolbox.isMac = false;
		toolbox.isDarwin = false;
		toolbox.isLinux = false;

		process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

		let expand = require('../index').expandHomeDirectory;
		let dir = expand('~/');

		assert(dir);
		assert(dir === `C:${path.sep}Users${path.sep}Home`);
	});

	it('Testing alternate expansion of simple home on Windows', () => {
		let toolbox = require('util.toolbox');
		toolbox.isWin = true;
		toolbox.isMac = false;
		toolbox.isDarwin = false;
		toolbox.isLinux = false;

		process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

		let expand = require('../index').expandHomeDirectory;
		let dir = expand('~\\');

		assert(dir);
		assert(dir === `C:${path.sep}Users${path.sep}Home`);
	});

	it('Testing the expansion of home directory on Windows', () => {
		let toolbox = require('util.toolbox');
		toolbox.isWin = true;
		toolbox.isMac = false;
		toolbox.isDarwin = false;
		toolbox.isLinux = false;

		process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

		let expand = require('../index').expandHomeDirectory;
		let dir = expand('~/test/expand');

		assert(dir);
		assert(dir == `C:${path.sep}Users${path.sep}Home${path.sep}test${path.sep}expand`);
	});

	it('Testing the expansion of home directory on Windows with Buffer', () => {
		let toolbox = require('util.toolbox');
		toolbox.isWin = true;
		toolbox.isMac = false;
		toolbox.isDarwin = false;
		toolbox.isLinux = false;

		process.env['USERPROFILE'] = `C:${path.sep}Users${path.sep}Home`;

		let expand = require('../index').expandHomeDirectory;
		let dir = expand(new Buffer('~/test/expand'));

		assert(dir);
		assert(dir == `C:${path.sep}Users${path.sep}Home${path.sep}test${path.sep}expand`);
	});

	it('Testing expansion of directory without tilde on Linux/Mac', () => {
		let toolbox = require('util.toolbox');
		toolbox.isWin = false;
		toolbox.isMac = true;
		toolbox.isDarwin = true;
		toolbox.isLinux = true;

		process.env['HOME'] = `${path.sep}home${path.sep}user`;

		let expand = require('../index').expandHomeDirectory;
		let dir = expand(`${path.sep}home`);

		assert(dir);
		assert(dir === `${path.sep}home`);
	});

	it('Testing expansion of single tilde home on Linux/Mac', () => {
		let toolbox = require('util.toolbox');
		toolbox.isWin = false;
		toolbox.isMac = true;
		toolbox.isDarwin = true;
		toolbox.isLinux = true;

		process.env['HOME'] = `${path.sep}home${path.sep}user`;

		let expand = require('../index').expandHomeDirectory;
		let dir = expand('~');

		assert(dir);
		assert(dir === `${path.sep}home${path.sep}user`);
	});

	it('Testing expansion of simple home on Linux/Mac', () => {
		let toolbox = require('util.toolbox');
		toolbox.isWin = false;
		toolbox.isMac = true;
		toolbox.isDarwin = true;
		toolbox.isLinux = true;

		process.env['HOME'] = `${path.sep}home${path.sep}user`;

		let expand = require('../index').expandHomeDirectory;
		let dir = expand('~/');

		assert(dir);
		assert(dir === `${path.sep}home${path.sep}user`);
	});

	it('Testing alternate expansion of simple home on Linux/Mac', () => {
		let toolbox = require('util.toolbox');
		toolbox.isWin = false;
		toolbox.isMac = true;
		toolbox.isDarwin = true;
		toolbox.isLinux = true;

		process.env['HOME'] = `${path.sep}home${path.sep}user`;

		let expand = require('../index').expandHomeDirectory;
		let dir = expand('~\\');

		assert(dir);
		assert(dir === `${path.sep}home${path.sep}user`);
	});

	it('Testing the expansion of home directory on Linux/Mac', () => {
		let toolbox = require('util.toolbox');
		toolbox.isWin = false;
		toolbox.isMac = true;
		toolbox.isDarwin = true;
		toolbox.isLinux = true;

		process.env['HOME'] = `${path.sep}home${path.sep}user`;

		let expand = require('../index').expandHomeDirectory;
		let dir = expand('~/test/expand');

		assert(dir);
		assert(dir == `${path.sep}home${path.sep}user${path.sep}test${path.sep}expand`);
	});

	it('Testing the expansion of home directory on Linux/Mac with Buffer', () => {
		let toolbox = require('util.toolbox');
		toolbox.isWin = false;
		toolbox.isMac = true;
		toolbox.isDarwin = true;
		toolbox.isLinux = true;

		process.env['HOME'] = `${path.sep}home${path.sep}user`;

		let expand = require('../index').expandHomeDirectory;
		let dir = expand(new Buffer('~/test/expand'));

		assert(dir);
		assert(dir == `${path.sep}home${path.sep}user${path.sep}test${path.sep}expand`);
	});
});