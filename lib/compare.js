'use strict';
const fs = require('fs');
const path = require('path');
const execute = require('child_process').spawnSync;
const os = require('os');

module.exports = (baseline, comparator, options) => {
	options = options || {};
	// todo: add check for png type
	// todo: add configurable fuzz

	this.baseline = (() => {
		if (typeof baseline === 'string') {
			if (fs.existsSync(baseline)) {
				return baseline;
			}
			throw new Error(`ENOENT: no such file or directory: '${baseline}'`);
		} else {
			throw new TypeError('baseline must be a String');
		}
	})();

	this.comparator = (() => {
		if (typeof comparator === 'string') {
			if (fs.existsSync(comparator)) {
				return comparator;
			}
			throw new Error(`ENOENT: no such file or directory: '${comparator}'`);
		} else {
			throw new TypeError('comparator must be a String');
		}
	})();

	this.outputDir = options.outputDir || path.dirname(this.comparator);

	this.properties = (() => {
		let properties;
		let height;
		let width;
		let format;
		let totalPixels;
		try {
			properties = execute(`identify`, [this.baseline]).output[1].toString().split(' ');
			height = parseInt(properties[2].split('x')[0], 10);
			width = parseInt(properties[2].split('x')[1], 10);
			totalPixels = height * width;
			format = properties[1];
		} catch (err) {
			throw err;
		}
		if (properties && height && width && format && totalPixels) {
			return {height, width, format, totalPixels};
		}
		throw new Error('Unknown error occurred while getting properties');
	})();
	// Now run the imagemagick compare command
	this.diffName = options.diffName || `${path.basename(this.baseline)}-${path.basename(this.comparator)}.diff.png`;
	const isNumber = new RegExp('^[0-9]*$');
	let output;
	try {
		const operation = execute('compare', ['-metric', 'AE', this.baseline, this.comparator, path.join(this.outputDir, this.diffName)]);
		// Process the stderr, unfortunately the compare command finds any difference is an error so we have to parse stderr
		output = operation.stderr !== null && operation.stderr.toString().length > 0 ? operation.stderr.toString().replace(os.EOL, '') : false;
	} catch (err) {
		throw err;
	}
	// Process the result into a percentage variance
	if (output && isNumber.test(output)) {
		return (100 / this.properties.totalPixels) * parseFloat(output);
	} else if (output) {
		throw output;
	} else {
		return 0;
	}
};
