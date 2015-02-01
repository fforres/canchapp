'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Fieldcomposition = mongoose.model('Fieldcomposition'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fieldcomposition;

/**
 * Fieldcomposition routes tests
 */
describe('Fieldcomposition CRUD tests', function() {
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

		// Save a user to the test db and create new Fieldcomposition
		user.save(function() {
			fieldcomposition = {
				name: 'Fieldcomposition Name'
			};

			done();
		});
	});

	it('should be able to save Fieldcomposition instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fieldcomposition
				agent.post('/fieldcompositions')
					.send(fieldcomposition)
					.expect(200)
					.end(function(fieldcompositionSaveErr, fieldcompositionSaveRes) {
						// Handle Fieldcomposition save error
						if (fieldcompositionSaveErr) done(fieldcompositionSaveErr);

						// Get a list of Fieldcompositions
						agent.get('/fieldcompositions')
							.end(function(fieldcompositionsGetErr, fieldcompositionsGetRes) {
								// Handle Fieldcomposition save error
								if (fieldcompositionsGetErr) done(fieldcompositionsGetErr);

								// Get Fieldcompositions list
								var fieldcompositions = fieldcompositionsGetRes.body;

								// Set assertions
								(fieldcompositions[0].user._id).should.equal(userId);
								(fieldcompositions[0].name).should.match('Fieldcomposition Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fieldcomposition instance if not logged in', function(done) {
		agent.post('/fieldcompositions')
			.send(fieldcomposition)
			.expect(401)
			.end(function(fieldcompositionSaveErr, fieldcompositionSaveRes) {
				// Call the assertion callback
				done(fieldcompositionSaveErr);
			});
	});

	it('should not be able to save Fieldcomposition instance if no name is provided', function(done) {
		// Invalidate name field
		fieldcomposition.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fieldcomposition
				agent.post('/fieldcompositions')
					.send(fieldcomposition)
					.expect(400)
					.end(function(fieldcompositionSaveErr, fieldcompositionSaveRes) {
						// Set message assertion
						(fieldcompositionSaveRes.body.message).should.match('Please fill Fieldcomposition name');
						
						// Handle Fieldcomposition save error
						done(fieldcompositionSaveErr);
					});
			});
	});

	it('should be able to update Fieldcomposition instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fieldcomposition
				agent.post('/fieldcompositions')
					.send(fieldcomposition)
					.expect(200)
					.end(function(fieldcompositionSaveErr, fieldcompositionSaveRes) {
						// Handle Fieldcomposition save error
						if (fieldcompositionSaveErr) done(fieldcompositionSaveErr);

						// Update Fieldcomposition name
						fieldcomposition.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fieldcomposition
						agent.put('/fieldcompositions/' + fieldcompositionSaveRes.body._id)
							.send(fieldcomposition)
							.expect(200)
							.end(function(fieldcompositionUpdateErr, fieldcompositionUpdateRes) {
								// Handle Fieldcomposition update error
								if (fieldcompositionUpdateErr) done(fieldcompositionUpdateErr);

								// Set assertions
								(fieldcompositionUpdateRes.body._id).should.equal(fieldcompositionSaveRes.body._id);
								(fieldcompositionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fieldcompositions if not signed in', function(done) {
		// Create new Fieldcomposition model instance
		var fieldcompositionObj = new Fieldcomposition(fieldcomposition);

		// Save the Fieldcomposition
		fieldcompositionObj.save(function() {
			// Request Fieldcompositions
			request(app).get('/fieldcompositions')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fieldcomposition if not signed in', function(done) {
		// Create new Fieldcomposition model instance
		var fieldcompositionObj = new Fieldcomposition(fieldcomposition);

		// Save the Fieldcomposition
		fieldcompositionObj.save(function() {
			request(app).get('/fieldcompositions/' + fieldcompositionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fieldcomposition.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fieldcomposition instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fieldcomposition
				agent.post('/fieldcompositions')
					.send(fieldcomposition)
					.expect(200)
					.end(function(fieldcompositionSaveErr, fieldcompositionSaveRes) {
						// Handle Fieldcomposition save error
						if (fieldcompositionSaveErr) done(fieldcompositionSaveErr);

						// Delete existing Fieldcomposition
						agent.delete('/fieldcompositions/' + fieldcompositionSaveRes.body._id)
							.send(fieldcomposition)
							.expect(200)
							.end(function(fieldcompositionDeleteErr, fieldcompositionDeleteRes) {
								// Handle Fieldcomposition error error
								if (fieldcompositionDeleteErr) done(fieldcompositionDeleteErr);

								// Set assertions
								(fieldcompositionDeleteRes.body._id).should.equal(fieldcompositionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fieldcomposition instance if not signed in', function(done) {
		// Set Fieldcomposition user 
		fieldcomposition.user = user;

		// Create new Fieldcomposition model instance
		var fieldcompositionObj = new Fieldcomposition(fieldcomposition);

		// Save the Fieldcomposition
		fieldcompositionObj.save(function() {
			// Try deleting Fieldcomposition
			request(app).delete('/fieldcompositions/' + fieldcompositionObj._id)
			.expect(401)
			.end(function(fieldcompositionDeleteErr, fieldcompositionDeleteRes) {
				// Set message assertion
				(fieldcompositionDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fieldcomposition error error
				done(fieldcompositionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Fieldcomposition.remove().exec();
		done();
	});
});