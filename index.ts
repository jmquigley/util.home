import * as path from "path";
import * as toolbox from "util.toolbox-node";

let homedir = "HOME";
if (toolbox.isWin()) {
	homedir = "USERPROFILE";
}
export let home = process.env[homedir].trim().replace(/[\\\/]+/g, "/");

export function expandHomeDirectory(src: string | Buffer) {
	if (src == null) {
		return "";
	}

	if (src instanceof Buffer) {
		src = src.toString();
	}

	if (src === "~") {
		return home;
	}

	const chevron = src.slice(0, 2);
	if (chevron === "~/" || chevron === "~\\") {
		return path
			.join(home, src.slice(2))
			.trim()
			.replace(/[\\\/]+/g, "/");
	}

	return src.trim().replace(/[\\\/]+/g, "/");
}
