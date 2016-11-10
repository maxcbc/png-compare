'use strict';
const fs = require('fs');
const path = require('path');
const execute = require('child_process').execSync;

module.exports = (baseline_str, comparator_str, options = {}) => {

	// todo: add check for png type
	// todo: add configurable fuzz

	this.baseline = (() => {
		if (typeof baseline_str === 'string') {
			if (fs.existsSync(baseline_str)) {
				return baseline_str;
			} else {
				throw new Error(`ENOENT: no such file or directory: '${baseline_str}'`);
			}
		} else {
			throw new TypeError('baseline must be a String');
		}
	})();

	this.comparator = (() => {
		if (typeof comparator_str === 'string') {
			if (fs.existsSync(comparator_str)) {
				return comparator_str;
			} else {
				throw new Error(`ENOENT: no such file or directory: '${comparator_str}'`);
			}
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
			properties = execute(`identify ${this.baseline}`).toString().split(' ');
			height = parseInt(properties[2].split('x')[0], 10);
			width = parseInt(properties[2].split('x')[1], 10);
			totalPixels = height * width;
			format = properties[1];
		} catch (err) {
			console.log(err);
			throw err;
		}
		if (properties && height && width && format && totalPixels) {
			return {height, width, format, totalPixels};
		} else {
			throw new Error('Unknown error occurred while getting properties');
		}
	})();


	this.diffName = options.diffName || `${path.basename(this.baseline)}-${path.basename(this.comparator)}.diff.png`;
	this.command = `compare -metric 'AE' ${this.baseline} ${this.comparator} ${path.join(this.outputDir, this.diffName)}`;

	let result;
	let error;
	try {
		result = execute(this.command);
	} catch (err) {
		error = err;
	}

	if (error && error.stderr && new RegExp('^[0-9]*$').test(error.stderr.toString())) {
		return (100 / this.properties.totalPixels) * parseFloat(error.stderr.toString());
	} else if (error) {
		throw error;
	} else if (result) {
		return 0;
	} else {
		throw new Error('Unknown error at comparison stage');
	}
};
