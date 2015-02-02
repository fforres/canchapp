'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Fieldschedule = mongoose.model('Fieldschedule'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fieldschedule;

/**
 * Fieldschedule routes tests
 */
describe('Fieldschedule CRUD tests', function() {
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

		// Save a user to the test db and create new Fieldschedule
		user.save(function() {
			fieldschedule = {
				name: 'Fieldschedule Name'
			};

			done();
		});
	});

	it('should be able to save Fieldschedule instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fieldschedule
				agent.post('/fieldschedules')
					.send(fieldschedule)
					.expect(200)
					.end(function(fieldscheduleSaveErr, fieldscheduleSaveRes) {
						// Handle Fieldschedule save error
						if (fieldscheduleSaveErr) done(fieldscheduleSaveErr);

						// Get a list of Fieldschedules
						agent.get('/fieldschedules')
							.end(function(fieldschedulesGetErr, fieldschedulesGetRes) {
								// Handle Fieldschedule save error
								if (fieldschedulesGetErr) done(fieldschedulesGetErr);

								// Get Fieldschedules list
								var fieldschedules = fieldschedulesGetRes.body;

								// Set assertions
								(fieldschedules[0].user._id).should.equal(userId);
								(fieldschedules[0].name).should.match('Fieldschedule Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fieldschedule instance if not logged in', function(done) {
		agent.post('/fieldschedules')
			.send(fieldschedule)
			.expect(401)
			.end(function(fieldscheduleSaveErr, fieldscheduleSaveRes) {
				// Call the assertion callback
				done(fieldscheduleSaveErr);
			});
	});

	it('should not be able to save Fieldschedule instance if no name is provided', function(done) {
		// Invalidate name field
		fieldschedule.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fieldschedule
				agent.post('/fieldschedules')
					.send(fieldschedule)
					.expect(400)
					.end(function(fieldscheduleSaveErr, fieldscheduleSaveRes) {
						// Set message assertion
						(fieldscheduleSaveRes.body.message).should.match('Please fill Fieldschedule name');
						
						// Handle Fieldschedule save error
						done(fieldscheduleSaveErr);
					});
			});
	});

	it('should be able to update Fieldschedule instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fieldschedule
				agent.post('/fieldschedules')
					.send(fieldschedule)
					.expect(200)
					.end(function(fieldscheduleSaveErr, fieldscheduleSaveRes) {
						// Handle Fieldschedule save error
						if (fieldscheduleSaveErr) done(fieldscheduleSaveErr);

						// Update Fieldschedule name
						fieldschedule.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fieldschedule
						agent.put('/fieldschedules/' + fieldscheduleSaveRes.body._id)
							.send(fieldschedule)
							.expect(200)
							.end(function(fieldscheduleUpdateErr, fieldscheduleUpdateRes) {
								// Handle Fieldschedule update error
								if (fieldscheduleUpdateErr) done(fieldscheduleUpdateErr);

								// Set assertions
								(fieldscheduleUpdateRes.body._id).should.equal(fieldscheduleSaveRes.body._id);
								(fieldscheduleUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fieldschedules if not signed in', function(done) {
		// Create new Fieldschedule model instance
		var fieldscheduleObj = new Fieldschedule(fieldschedule);

		// Save the Fieldschedule
		fieldscheduleObj.save(function() {
			// Request Fieldschedules
			request(app).get('/fieldschedules')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fieldschedule if not signed in', function(done) {
		// Create new Fieldschedule model instance
		var fieldscheduleObj = new Fieldschedule(fieldschedule);

		// Save the Fieldschedule
		fieldscheduleObj.save(function() {
			request(app).get('/fieldschedules/' + fieldscheduleObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fieldschedule.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fieldschedule instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fieldschedule
				agent.post('/fieldschedules')
					.send(fieldschedule)
					.expect(200)
					.end(function(fieldscheduleSaveErr, fieldscheduleSaveRes) {
						// Handle Fieldschedule save error
						if (fieldscheduleSaveErr) done(fieldscheduleSaveErr);

						// Delete existing Fieldschedule
						agent.delete('/fieldschedules/' + fieldscheduleSaveRes.body._id)
							.send(fieldschedule)
							.expect(200)
							.end(function(fieldscheduleDeleteErr, fieldscheduleDeleteRes) {
								// Handle Fieldschedule error error
								if (fieldscheduleDeleteErr) done(fieldscheduleDeleteErr);

								// Set assertions
								(fieldscheduleDeleteRes.body._id).should.equal(fieldscheduleSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fieldschedule instance if not signed in', function(done) {
		// Set Fieldschedule user 
		fieldschedule.user = user;

		// Create new Fieldschedule model instance
		var fieldscheduleObj = new Fieldschedule(fieldschedule);

		// Save the Fieldschedule
		fieldscheduleObj.save(function() {
			// Try deleting Fieldschedule
			request(app).delete('/fieldschedules/' + fieldscheduleObj._id)
			.expect(401)
			.end(function(fieldscheduleDeleteErr, fieldscheduleDeleteRes) {
				// Set message assertion
				(fieldscheduleDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fieldschedule error error
				done(fieldscheduleDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Fieldschedule.remove().exec();
		done();
	});
});