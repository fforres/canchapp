'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Equipmentrental = mongoose.model('Equipmentrental');

/**
 * Globals
 */
var user, equipmentrental;

/**
 * Unit tests
 */
describe('Equipmentrental Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			equipmentrental = new Equipmentrental({
				name: 'Equipmentrental Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return equipmentrental.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			equipmentrental.name = '';

			return equipmentrental.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Equipmentrental.remove().exec();
		User.remove().exec();

		done();
	});
});