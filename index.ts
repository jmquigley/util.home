import * as path from 'path';
import * as toolbox from 'util.toolbox';

let normalize = require('normalize-path');

let homedir = 'HOME';
if (toolbox.isWin) {
	homedir = 'USERPROFILE';
}
export let home = process.env[homedir];

export function expandHomeDirectory (src: String | Buffer) {
	if (src == null) {
		return '';
	}

	if (src instanceof Buffer) {
		src = src.toString();
	}

	if (src === '~') {
		return normalize(home);
	}

	let chevron = src.slice(0, 2);
	if (chevron === '~/' || chevron === '~\\') {
		return normalize(path.join(home, src.slice(2)));
	}

	return normalize(src);
}
