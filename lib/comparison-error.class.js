'use strict';

const npmPackage = require('../package.json');

class ComparisonError {
	constructor(value) {
		this.value = value;
		this.message = `${npmPackage.name} v${npmPackage.version} error:\n ${value}`;
	}
}

module.exports = ComparisonError;
