'use strict';
const fs = require('fs');
const path = require('path');
const execute = require('child_process').spawnSync;

module.exports = (baseline, comparator, options = {}) => {
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

	let result;
	let error;
	try {
		result = execute('compare', ['-metric', 'AE', this.baseline, this.comparator, path.join(this.outputDir, this.diffName)]);
	} catch (err) {
		throw err;
	}
	// Process the result into a percentage variance
	if (result.status === 0) {
		return 0;
	} else if (result.status === 1 && new RegExp('^[0-9]*$').test(result.output[2].toString())) {
		return (100 / this.properties.totalPixels) * parseFloat(result.output[2].toString());
	} else if (result.status === 1) {
		throw result.output[2].toString()
	} else {
		throw new Error('Unknown error at comparison stage');
	}

};
