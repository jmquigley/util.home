import * as path from 'path';
import * as toolbox from 'util.toolbox';

let homedir = 'HOME';
if (toolbox.isWin) {
	homedir = 'USERPROFILE';
}
let home = process.env[homedir];

export function expandHomeDirectory (src: String | Buffer) {
	if (src instanceof Buffer) {
		src = src.toString();
	}

	if (!src || src === '~') {
		return src;
	}

	let chevron = src.slice(0, 2);
	if (chevron === '~/' || chevron === '~\\') {
		return path.join(home, src.slice(2));
	}

	return path;
}
