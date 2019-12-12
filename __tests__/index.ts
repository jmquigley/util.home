import * as _ from "lodash";
import * as path from "path";

const debug = require("debug")("util.home.test");
const saveEnv = _.cloneDeep(process.env);

beforeEach(() => {
	jest.resetModules();
	process.env = _.cloneDeep(saveEnv);
});

test("Testing with bad directory source", () => {
	const expand = require("../index").expandHomeDirectory;
	const dir = expand(null);

	expect(dir).toBe("");
});

describe("windows tests", () => {
	beforeEach(() => {
		Object.defineProperty(process, "platform", {
			value: "win"
		});
	});

	test("Testing expansion of directory without tilde on Windows", () => {
		const toolbox = require("util.toolbox-node");

		process.env["USERPROFILE"] = `C:${path.sep}Users${path.sep}Home`;

		const expand = require("../index").expandHomeDirectory;
		const dir = expand(`C:${path.sep}Users`);

		expect(dir).toBeTruthy();
		expect(dir).toBe("C:/Users");
	});

	test("Testing expansion of single tilde home on Windows", () => {
		const toolbox = require("util.toolbox-node");

		process.env["USERPROFILE"] = `C:${path.sep}Users${path.sep}Home`;

		const expand = require("../index").expandHomeDirectory;
		const dir = expand("~");

		expect(dir).toBeTruthy();
		expect(dir).toBe("C:/Users/Home");
	});

	test("Testing expansion of simple home on Windows", () => {
		const toolbox = require("util.toolbox-node");

		process.env["USERPROFILE"] = `C:${path.sep}Users${path.sep}Home`;

		const expand = require("../index").expandHomeDirectory;
		const dir = expand("~/");

		expect(dir).toBeTruthy();
		expect(dir).toBe("C:/Users/Home");
	});

	test("Testing alternate expansion of simple home on Windows", () => {
		const toolbox = require("util.toolbox-node");

		process.env["USERPROFILE"] = `C:${path.sep}Users${path.sep}Home`;

		const expand = require("../index").expandHomeDirectory;
		const dir = expand("~\\");

		expect(dir).toBeTruthy();
		expect(dir).toBe("C:/Users/Home");
	});

	test("Testing the expansion of home directory on Windows", () => {
		const toolbox = require("util.toolbox-node");

		process.env["USERPROFILE"] = `C:${path.sep}Users${path.sep}Home`;

		const expand = require("../index").expandHomeDirectory;
		const dir = expand("~/test/expand");

		expect(dir).toBeTruthy();
		expect(dir).toBe("C:/Users/Home/test/expand");
	});

	test("Testing the expansion of home directory on Windows with Buffer", () => {
		const toolbox = require("util.toolbox-node");

		process.env["USERPROFILE"] = `C:${path.sep}Users${path.sep}Home`;

		const expand = require("../index").expandHomeDirectory;
		const dir = expand(new Buffer.from("~/test/expand"));

		expect(dir).toBeTruthy();
		expect(dir).toBe("C:/Users/Home/test/expand");
	});
});

for (const testName of ["darwin", "linux"]) {
	describe(`${testName} tests`, () => {
		beforeEach(() => {
			Object.defineProperty(process, "platform", {
				value: testName
			});
		});

		test(`Testing expansion of directory without tilde`, () => {
			const toolbox = require("util.toolbox-node");

			process.env["HOME"] = `${path.sep}home${path.sep}user`;

			const expand = require("../index").expandHomeDirectory;
			const dir = expand(`${path.sep}home`);

			expect(dir).toBeTruthy();
			expect(dir).toBe("/home");
		});

		test("Testing expansion of single tilde home", () => {
			const toolbox = require("util.toolbox-node");

			process.env["HOME"] = `${path.sep}home${path.sep}user`;

			const expand = require("../index").expandHomeDirectory;
			const dir = expand("~");

			expect(dir).toBeTruthy();
			expect(dir).toBe("/home/user");
		});

		test("Testing expansion of simple home", () => {
			const toolbox = require("util.toolbox-node");

			process.env["HOME"] = `${path.sep}home${path.sep}user`;

			const expand = require("../index").expandHomeDirectory;
			const dir = expand("~/");

			expect(dir).toBeTruthy();
			expect(dir).toBe("/home/user");
		});

		test("Testing alternate expansion of simple home", () => {
			const toolbox = require("util.toolbox-node");

			process.env["HOME"] = `${path.sep}home${path.sep}user`;

			const expand = require("../index").expandHomeDirectory;
			const dir = expand("~\\");

			expect(dir).toBeTruthy();
			expect(dir).toBe("/home/user");
		});

		test("Testing the expansion of home directory", () => {
			const toolbox = require("util.toolbox-node");

			process.env["HOME"] = `${path.sep}home${path.sep}user`;

			const expand = require("../index").expandHomeDirectory;
			const dir = expand("~/test/expand");

			expect(dir).toBeTruthy();
			expect(dir).toBe("/home/user/test/expand");
		});

		test("Testing the expansion of home directory with Buffer", () => {
			const toolbox = require("util.toolbox-node");

			process.env["HOME"] = `${path.sep}home${path.sep}user`;

			const expand = require("../index").expandHomeDirectory;
			const dir = expand(new Buffer.from("~/test/expand"));

			expect(dir).toBeTruthy();
			expect(dir).toBe("/home/user/test/expand");
		});
	});
}
