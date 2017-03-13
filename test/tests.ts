'use strict';

import * as assert from 'assert';
import * as _ from 'lodash';
import {isWin} from 'util.toolbox';

let saveEnv = _.cloneDeep(process.env);

describe('Executing test suite', () => {

	beforeEach(() => {
		process.env = _.cloneDeep(saveEnv);
		delete require.cache[require.resolve('../index')];
	});

	it('Testing expansion of simple home on Windows', () => {
		if (isWin) {
			process.env['USERPROFILE'] = 'C:/Users/Home';

			let expand = require('../index').expandHomeDirectory;
			let dir = expand('~/');

			assert(dir);
			assert(dir === 'C:\\Users\\Home');
		} else {
			assert(true, 'This test runs on windows only');
		}
	});

	it('Testing alternate expansion of simple home on Windows', () => {
		if (isWin) {
			process.env['USERPROFILE'] = 'C:/Users/Home';

			let expand = require('../index').expandHomeDirectory;
			let dir = expand('~\\');

			assert(dir);
			assert(dir === 'C:\\Users\\Home');
		} else {
			assert(true, 'This test runs on windows only');
		}
	});

	it('Testing the expansion of home directory on Windows', () => {
		if (isWin) {
			process.env['USERPROFILE'] = 'C:\\Users\\Home';

			let expand = require('../index').expandHomeDirectory;
			let dir = expand('~/test/expand');

			assert(dir);
			assert(dir == 'C:\\Users\\Home\\test\\expand');
		} else {
			assert(true, 'This test runs on windows only');
		}
	});

	it('Testing the expansion of home directory on Windows with Buffer', () => {
		if (isWin) {
			process.env['USERPROFILE'] = 'C:\\Users\\Home';

			let expand = require('../index').expandHomeDirectory;
			let dir = expand(new Buffer('~/test/expand'));

			assert(dir);
			assert(dir == 'C:\\Users\\Home\\test\\expand');
		} else {
			assert(true, 'This test runs on windows only');
		}
	});
});
