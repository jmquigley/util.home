# util.home

> Expands the ~ home directory in a path

[![build](https://github.com/jmquigley/util.home/workflows/build/badge.svg)](https://github.com/jmquigley/util.home/actions)
[![analysis](https://img.shields.io/badge/analysis-tslint-9cf.svg)](https://palantir.github.io/tslint/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![testing](https://img.shields.io/badge/testing-jest-blue.svg)](https://facebook.github.io/jest/)
[![NPM](https://img.shields.io/npm/v/util.home.svg)](https://www.npmjs.com/package/util.home)


Path strings that use the `~`, `~/` or `~\` at the front of the string will be expanded to use the home directory of the user.  The home directory is dependent on the architecture.  For Linux/OSX the environment variable `HOME` is used.  On the Windows operating system it uses `USERPROFILE`.

This module uses typescript and has a type definition file supplied with the package.  It will also accept a `Buffer` or `string`.

This module was inspired by the [expand-home-dir](https://www.npmjs.com/package/expand-home-dir) package.


## Installation

This module uses [yarn](https://yarnpkg.com/en/) to manage dependencies and run scripts for development.

To install as an application dependency:
```
$ yarn add --dev util.home
```

To build the app and run all tests:
```
$ yarn run all
```

## Usage
#### Windows
```javascript
let expand = require('util.home').expandHomeDirectory;

// With USERPROFILE = 'C:\Users\foo'
let dir = expand('~/Documents');
console.log(dir);  // dir = 'C:\Users\foo\Documents'
```

#### Linux/OSX
```javascript
let expand = require('util.home').expandHomeDirectory;

// With HOME = '/home/foo`'
let dir = expand('~/documents');
console.log(dir);  // dir = '/home/foo/documents'
```
