'use strict';
const expect = require('chai').expect;
const compare = require('../../lib/comparison.js');

describe('comparison', () => {

	

			//
			// it('should detect the dimensions of a provided baseline', () => {
			// 	let err;
			// 	let a, b;
			// 	try {
			// 		a = new Comparison('test/data/a.png', 'test/data/b.png');
			// 		b = new Comparison('test/data/f.png', 'test/data/g.png');
			// 	} catch (e) {
			// 		err = e;
			// 	}
			// 	expect(err).to.not.exist;
			// 	expect(a).to.exist;
			// 	expect(b).to.exist;
			// 	expect(a._height).to.equal(500);
			// 	expect(a._width).to.equal(500);
			// 	expect(a._totalPixels).to.equal(250000);
			// 	expect(b._height).to.equal(500);
			// 	expect(b._width).to.equal(500);
			// 	expect(b._totalPixels).to.equal(250000);
			//
			// });


		// describe('type and existence checking', () => {

			it('should successfully call if passed valid string baseline and comparator and no options', () => {
				let err;
				let result;
				try {
					result = compare('test/data/a.png', 'test/data/b.png');
				} catch (e) {
					err = e;
				}
				expect(err).to.not.exist;
				expect(result).to.equal(0);
			});

			// it('should throw a TypeError if it is instantiated without a baseline or comparator', () => {
			// 	let err;
			// 	try {
			// 		new Comparison();
			// 	} catch (e) {
			// 		err = e;
			// 	}
			// 	expect(err.constructor.name).to.equal('TypeError');
			// 	expect(err.message).to.equal('baseline must be a String')
			// });
			//
			// it('should throw a TypeError if it is instantiated without a comparator', () => {
			// 	let err;
			// 	try {
			// 		new Comparison('test/data/a.png', null);
			// 	} catch (e) {
			// 		err = e;
			// 	}
			// 	expect(err.constructor.name).to.equal('TypeError');
			// 	expect(err.message).to.equal('comparator must be a String')
			// });
			//
			// it('should throw a ENOENT Error if it is instantiated with a non existent string baseline', () => {
			// 	let err;
			// 	try {
			// 		new Comparison('test/data/non-existent.png', 'test/data/a.png');
			// 	} catch (e) {
			// 		err = e;
			// 	}
			// 	expect(err.constructor.name).to.equal('Error');
			// 	expect(err.message).to.equal(`ENOENT: no such file or directory: 'test/data/non-existent.png'`)
			// });
			//
			// it('should throw a ENOENT Error if it is instantiated with a non existent string comparator', () => {
			// 	let err;
			// 	try {
			// 		new Comparison('test/data/a.png', 'test/data/non-existent.png');
			// 	} catch (e) {
			// 		err = e;
			// 	}
			// 	expect(err.constructor.name).to.equal('Error');
			// 	expect(err.message).to.equal(`ENOENT: no such file or directory: 'test/data/non-existent.png'`)
			// });

		// });




});
