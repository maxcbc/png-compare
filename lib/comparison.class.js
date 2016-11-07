'use strict';
const fs = require('fs');
const execute = require('child_process').execSync;

class Comparison {
	constructor(baseline_str, comparator_str) {
		this._metric = 'AE';
		this._totalPixels = 250000;
		if (typeof baseline_str === 'string') {
			if (fs.existsSync(baseline_str)) {
				this._baseline = baseline_str;
			} else {
				throw new Error(`ENOENT: no such file or directory: '${baseline_str}'`);
			}
		} else {
			throw new TypeError('baseline must be a String');
		}
		if (typeof comparator_str === 'string') {
			if (fs.existsSync(comparator_str)) {
				this._comparator = comparator_str;
			} else {
				throw new Error(`ENOENT: no such file or directory: '${comparator_str}'`);
			}
		} else {
			throw new TypeError('comparator must be a String');
		}
		this._baseDir = comparator_str.indexOf('/') >=0 ? comparator_str.substr(0, comparator_str.lastIndexOf('/') + 1) : './';
	}

	compare() {
		let result, error, difference;
		const isNumber = new RegExp('^[0-9]*$');
		const diff = `${this._baseDir}diff.png`;
		const command = `compare -metric ${this._metric} ${this._baseline} ${this._comparator} ${this._baseDir}diff.png`;
		try {
			result = execute(command);
		} catch (err) {
			error = err
		}

		if(error && isNumber.test(error.stderr.toString())) {
			difference = (100 / this._totalPixels) * parseFloat(error.stderr.toString());
		} else if (error) {
			throw error
		} else if (result) {
			console.log('result exists');
			difference = 0
		} else {
			throw new Error('Unknown Error')
		}
		
		return difference;

		// Add fuzz
		// Add output dir
		// Add highlight colour
		// Add metric

		// AS USED IN WRAITH
		// //"compare
		// // -dissimilarity-threshold 1
		// // -fuzz #{wraith.fuzz}
		// // -metric AE = DONE
		// // -highlight-color #{wraith.highlight_color}
		// // #{base}
		// // #{compare.shellescape}
		// // #{output}"
	}
}

module.exports = Comparison;
