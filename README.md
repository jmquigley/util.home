# util.home [![Build Status](https://travis-ci.org/jmquigley/util.home.svg?branch=master)](https://travis-ci.org/jmquigley/util.home) [![tslint code style](https://img.shields.io/badge/code_style-TSlint-5ed9c7.svg)](https://palantir.github.io/tslint/) [![Test Runner](https://img.shields.io/badge/testing-ava-blue.svg)](https://github.com/avajs/ava) [![NPM](https://img.shields.io/npm/v/util.home.svg)](https://www.npmjs.com/package/util.home) [![Coverage Status](https://coveralls.io/repos/github/jmquigley/util.home/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.home?branch=master)

> Expands the ~ home directory in a path Edit

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
