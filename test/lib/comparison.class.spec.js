'use strict';
const expect = require('chai').expect;
const Comparison = require('../../lib/comparison.class.js');

describe('Class: Comparison', () => {
	
	describe('constructor', () => {

		it('should successfully instantiate if passed valid string baseline and comparator', () => {
			let err;
			let instance;
			try {
				instance = new Comparison('test/data/a.png', 'test/data/b.png');
			} catch (e) {
				err = e;
			}
			expect(err).to.not.exist;
			expect(instance).to.exist;
			expect(instance._baseline).to.exist;
			expect(instance._comparator).to.exist;
		});

		it('should throw a TypeError if it is instantiated without a baseline or comparator', () => {
			let err;
			try {
				new Comparison();
			} catch (e) {
				err = e;
			}
			expect(err.constructor.name).to.equal('TypeError');
			expect(err.message).to.equal('baseline must be a String')
		});

		it('should throw a TypeError if it is instantiated without a comparator', () => {
			let err;
			try {
				new Comparison('test/data/a.png', null);
			} catch (e) {
				err = e;
			}
			expect(err.constructor.name).to.equal('TypeError');
			expect(err.message).to.equal('comparator must be a String')
		});

		it('should throw a ENOENT Error if it is instantiated with a non existent string baseline', () => {
			let err;
			try {
				new Comparison('test/data/non-existent.png', 'test/data/a.png');
			} catch (e) {
				err = e;
			}
			expect(err.constructor.name).to.equal('Error');
			expect(err.message).to.equal(`ENOENT: no such file or directory: 'test/data/non-existent.png'`)
		});

		it('should throw a ENOENT Error if it is instantiated with a non existent string comparator', () => {
			let err;
			try {
				new Comparison('test/data/a.png', 'test/data/non-existent.png');
			} catch (e) {
				err = e;
			}
			expect(err.constructor.name).to.equal('Error');
			expect(err.message).to.equal(`ENOENT: no such file or directory: 'test/data/non-existent.png'`)
		});

	});

	describe('methods', () => {



		describe('compare', () => {

			it('should return a percentage difference in number format if called without any arguments', () => {
				let err, instance, comparison;
				
				try {
					instance = new Comparison('test/data/a.png', 'test/data/d.png');
					comparison = instance.compare();
				} catch (e) {
					err = e;
				}
				// There should be no error
				expect(err).to.not.exist;
				// The result should be a number between 0 and 100 inclusive
				expect(comparison.constructor.name).to.equal('Number');
				expect(comparison <= 100 && comparison >= 0).to.equal(true)

			})

		})

	});

});
