'use strict';
const expect = require('chai').expect;
const compare = require('../../lib/comparison.js');

describe('comparison', () => {

	

		describe('successful comparisons', () => {

			it(`should return a difference of '0' if asked to compare two identical images`, () => {
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

			it(`should return a difference greater than '0' and lower or equal to '100' if asked to compare two different images`, () => {
				let err;
				const result = {};
				try {
					result.a = compare('test/data/a.png', 'test/data/d.png');
					result.b = compare('test/data/f.png', 'test/data/g.png');
				} catch (e) {
					err = e;
				}
				expect(err).to.not.exist;
				console.log(result);
				expect(result.a > 0).to.equal(true);
				expect(result.a <= 100).to.equal(true);
				expect(result.a).to.equal(0.48160000000000003);
				expect(result.b > 0).to.equal(true);
				expect(result.b <= 100).to.equal(true);
				expect(result.b).to.equal(1.1953359609609608);
			});

		});


		describe('type and existence checking', () => {

			it('should throw a TypeError if it is instantiated without a baseline or comparator', () => {
				let err;
				try {
					compare()
				} catch (e) {
					err = e;
				}
				expect(err.constructor.name).to.equal('TypeError');
				expect(err.message).to.equal('baseline must be a String')
			});

			it('should throw a TypeError if it is instantiated without a comparator', () => {
				let err;
				try {
					compare('test/data/a.png');
				} catch (e) {
					err = e;
				}
				expect(err.constructor.name).to.equal('TypeError');
				expect(err.message).to.equal('comparator must be a String')
			});

			it('should throw a ENOENT Error if it is instantiated with a non existent string baseline', () => {
				let err;
				try {
					compare('test/data/non-existent.png', 'test/data/a.png');
				} catch (e) {
					err = e;
				}
				expect(err.constructor.name).to.equal('Error');
				expect(err.message).to.equal(`ENOENT: no such file or directory: 'test/data/non-existent.png'`)
			});

			it('should throw a ENOENT Error if it is instantiated with a non existent string comparator', () => {
				let err;
				try {
					compare('test/data/a.png', 'test/data/non-existent.png');
				} catch (e) {
					err = e;
				}
				expect(err.constructor.name).to.equal('Error');
				expect(err.message).to.equal(`ENOENT: no such file or directory: 'test/data/non-existent.png'`)
			});

		});




});
