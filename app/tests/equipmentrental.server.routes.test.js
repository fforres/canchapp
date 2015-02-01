'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Equipmentrental = mongoose.model('Equipmentrental'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, equipmentrental;

/**
 * Equipmentrental routes tests
 */
describe('Equipmentrental CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Equipmentrental
		user.save(function() {
			equipmentrental = {
				name: 'Equipmentrental Name'
			};

			done();
		});
	});

	it('should be able to save Equipmentrental instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Equipmentrental
				agent.post('/equipmentrentals')
					.send(equipmentrental)
					.expect(200)
					.end(function(equipmentrentalSaveErr, equipmentrentalSaveRes) {
						// Handle Equipmentrental save error
						if (equipmentrentalSaveErr) done(equipmentrentalSaveErr);

						// Get a list of Equipmentrentals
						agent.get('/equipmentrentals')
							.end(function(equipmentrentalsGetErr, equipmentrentalsGetRes) {
								// Handle Equipmentrental save error
								if (equipmentrentalsGetErr) done(equipmentrentalsGetErr);

								// Get Equipmentrentals list
								var equipmentrentals = equipmentrentalsGetRes.body;

								// Set assertions
								(equipmentrentals[0].user._id).should.equal(userId);
								(equipmentrentals[0].name).should.match('Equipmentrental Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Equipmentrental instance if not logged in', function(done) {
		agent.post('/equipmentrentals')
			.send(equipmentrental)
			.expect(401)
			.end(function(equipmentrentalSaveErr, equipmentrentalSaveRes) {
				// Call the assertion callback
				done(equipmentrentalSaveErr);
			});
	});

	it('should not be able to save Equipmentrental instance if no name is provided', function(done) {
		// Invalidate name field
		equipmentrental.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Equipmentrental
				agent.post('/equipmentrentals')
					.send(equipmentrental)
					.expect(400)
					.end(function(equipmentrentalSaveErr, equipmentrentalSaveRes) {
						// Set message assertion
						(equipmentrentalSaveRes.body.message).should.match('Please fill Equipmentrental name');
						
						// Handle Equipmentrental save error
						done(equipmentrentalSaveErr);
					});
			});
	});

	it('should be able to update Equipmentrental instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Equipmentrental
				agent.post('/equipmentrentals')
					.send(equipmentrental)
					.expect(200)
					.end(function(equipmentrentalSaveErr, equipmentrentalSaveRes) {
						// Handle Equipmentrental save error
						if (equipmentrentalSaveErr) done(equipmentrentalSaveErr);

						// Update Equipmentrental name
						equipmentrental.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Equipmentrental
						agent.put('/equipmentrentals/' + equipmentrentalSaveRes.body._id)
							.send(equipmentrental)
							.expect(200)
							.end(function(equipmentrentalUpdateErr, equipmentrentalUpdateRes) {
								// Handle Equipmentrental update error
								if (equipmentrentalUpdateErr) done(equipmentrentalUpdateErr);

								// Set assertions
								(equipmentrentalUpdateRes.body._id).should.equal(equipmentrentalSaveRes.body._id);
								(equipmentrentalUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Equipmentrentals if not signed in', function(done) {
		// Create new Equipmentrental model instance
		var equipmentrentalObj = new Equipmentrental(equipmentrental);

		// Save the Equipmentrental
		equipmentrentalObj.save(function() {
			// Request Equipmentrentals
			request(app).get('/equipmentrentals')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Equipmentrental if not signed in', function(done) {
		// Create new Equipmentrental model instance
		var equipmentrentalObj = new Equipmentrental(equipmentrental);

		// Save the Equipmentrental
		equipmentrentalObj.save(function() {
			request(app).get('/equipmentrentals/' + equipmentrentalObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', equipmentrental.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Equipmentrental instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Equipmentrental
				agent.post('/equipmentrentals')
					.send(equipmentrental)
					.expect(200)
					.end(function(equipmentrentalSaveErr, equipmentrentalSaveRes) {
						// Handle Equipmentrental save error
						if (equipmentrentalSaveErr) done(equipmentrentalSaveErr);

						// Delete existing Equipmentrental
						agent.delete('/equipmentrentals/' + equipmentrentalSaveRes.body._id)
							.send(equipmentrental)
							.expect(200)
							.end(function(equipmentrentalDeleteErr, equipmentrentalDeleteRes) {
								// Handle Equipmentrental error error
								if (equipmentrentalDeleteErr) done(equipmentrentalDeleteErr);

								// Set assertions
								(equipmentrentalDeleteRes.body._id).should.equal(equipmentrentalSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Equipmentrental instance if not signed in', function(done) {
		// Set Equipmentrental user 
		equipmentrental.user = user;

		// Create new Equipmentrental model instance
		var equipmentrentalObj = new Equipmentrental(equipmentrental);

		// Save the Equipmentrental
		equipmentrentalObj.save(function() {
			// Try deleting Equipmentrental
			request(app).delete('/equipmentrentals/' + equipmentrentalObj._id)
			.expect(401)
			.end(function(equipmentrentalDeleteErr, equipmentrentalDeleteRes) {
				// Set message assertion
				(equipmentrentalDeleteRes.body.message).should.match('User is not logged in');

				// Handle Equipmentrental error error
				done(equipmentrentalDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Equipmentrental.remove().exec();
		done();
	});
});