'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Facility = mongoose.model('Facility'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, facility;

/**
 * Facility routes tests
 */
describe('Facility CRUD tests', function() {
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

		// Save a user to the test db and create new Facility
		user.save(function() {
			facility = {
				name: 'Facility Name'
			};

			done();
		});
	});

	it('should be able to save Facility instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Facility
				agent.post('/facilities')
					.send(facility)
					.expect(200)
					.end(function(facilitySaveErr, facilitySaveRes) {
						// Handle Facility save error
						if (facilitySaveErr) done(facilitySaveErr);

						// Get a list of Facilities
						agent.get('/facilities')
							.end(function(facilitiesGetErr, facilitiesGetRes) {
								// Handle Facility save error
								if (facilitiesGetErr) done(facilitiesGetErr);

								// Get Facilities list
								var facilities = facilitiesGetRes.body;

								// Set assertions
								(facilities[0].user._id).should.equal(userId);
								(facilities[0].name).should.match('Facility Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Facility instance if not logged in', function(done) {
		agent.post('/facilities')
			.send(facility)
			.expect(401)
			.end(function(facilitySaveErr, facilitySaveRes) {
				// Call the assertion callback
				done(facilitySaveErr);
			});
	});

	it('should not be able to save Facility instance if no name is provided', function(done) {
		// Invalidate name field
		facility.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Facility
				agent.post('/facilities')
					.send(facility)
					.expect(400)
					.end(function(facilitySaveErr, facilitySaveRes) {
						// Set message assertion
						(facilitySaveRes.body.message).should.match('Please fill Facility name');
						
						// Handle Facility save error
						done(facilitySaveErr);
					});
			});
	});

	it('should be able to update Facility instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Facility
				agent.post('/facilities')
					.send(facility)
					.expect(200)
					.end(function(facilitySaveErr, facilitySaveRes) {
						// Handle Facility save error
						if (facilitySaveErr) done(facilitySaveErr);

						// Update Facility name
						facility.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Facility
						agent.put('/facilities/' + facilitySaveRes.body._id)
							.send(facility)
							.expect(200)
							.end(function(facilityUpdateErr, facilityUpdateRes) {
								// Handle Facility update error
								if (facilityUpdateErr) done(facilityUpdateErr);

								// Set assertions
								(facilityUpdateRes.body._id).should.equal(facilitySaveRes.body._id);
								(facilityUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Facilities if not signed in', function(done) {
		// Create new Facility model instance
		var facilityObj = new Facility(facility);

		// Save the Facility
		facilityObj.save(function() {
			// Request Facilities
			request(app).get('/facilities')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Facility if not signed in', function(done) {
		// Create new Facility model instance
		var facilityObj = new Facility(facility);

		// Save the Facility
		facilityObj.save(function() {
			request(app).get('/facilities/' + facilityObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', facility.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Facility instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Facility
				agent.post('/facilities')
					.send(facility)
					.expect(200)
					.end(function(facilitySaveErr, facilitySaveRes) {
						// Handle Facility save error
						if (facilitySaveErr) done(facilitySaveErr);

						// Delete existing Facility
						agent.delete('/facilities/' + facilitySaveRes.body._id)
							.send(facility)
							.expect(200)
							.end(function(facilityDeleteErr, facilityDeleteRes) {
								// Handle Facility error error
								if (facilityDeleteErr) done(facilityDeleteErr);

								// Set assertions
								(facilityDeleteRes.body._id).should.equal(facilitySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Facility instance if not signed in', function(done) {
		// Set Facility user 
		facility.user = user;

		// Create new Facility model instance
		var facilityObj = new Facility(facility);

		// Save the Facility
		facilityObj.save(function() {
			// Try deleting Facility
			request(app).delete('/facilities/' + facilityObj._id)
			.expect(401)
			.end(function(facilityDeleteErr, facilityDeleteRes) {
				// Set message assertion
				(facilityDeleteRes.body.message).should.match('User is not logged in');

				// Handle Facility error error
				done(facilityDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Facility.remove().exec();
		done();
	});
});