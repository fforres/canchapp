'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Comuna = mongoose.model('Comuna'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, comuna;

/**
 * Comuna routes tests
 */
describe('Comuna CRUD tests', function() {
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

		// Save a user to the test db and create new Comuna
		user.save(function() {
			comuna = {
				name: 'Comuna Name'
			};

			done();
		});
	});

	it('should be able to save Comuna instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Comuna
				agent.post('/comunas')
					.send(comuna)
					.expect(200)
					.end(function(comunaSaveErr, comunaSaveRes) {
						// Handle Comuna save error
						if (comunaSaveErr) done(comunaSaveErr);

						// Get a list of Comunas
						agent.get('/comunas')
							.end(function(comunasGetErr, comunasGetRes) {
								// Handle Comuna save error
								if (comunasGetErr) done(comunasGetErr);

								// Get Comunas list
								var comunas = comunasGetRes.body;

								// Set assertions
								(comunas[0].user._id).should.equal(userId);
								(comunas[0].name).should.match('Comuna Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Comuna instance if not logged in', function(done) {
		agent.post('/comunas')
			.send(comuna)
			.expect(401)
			.end(function(comunaSaveErr, comunaSaveRes) {
				// Call the assertion callback
				done(comunaSaveErr);
			});
	});

	it('should not be able to save Comuna instance if no name is provided', function(done) {
		// Invalidate name field
		comuna.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Comuna
				agent.post('/comunas')
					.send(comuna)
					.expect(400)
					.end(function(comunaSaveErr, comunaSaveRes) {
						// Set message assertion
						(comunaSaveRes.body.message).should.match('Please fill Comuna name');
						
						// Handle Comuna save error
						done(comunaSaveErr);
					});
			});
	});

	it('should be able to update Comuna instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Comuna
				agent.post('/comunas')
					.send(comuna)
					.expect(200)
					.end(function(comunaSaveErr, comunaSaveRes) {
						// Handle Comuna save error
						if (comunaSaveErr) done(comunaSaveErr);

						// Update Comuna name
						comuna.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Comuna
						agent.put('/comunas/' + comunaSaveRes.body._id)
							.send(comuna)
							.expect(200)
							.end(function(comunaUpdateErr, comunaUpdateRes) {
								// Handle Comuna update error
								if (comunaUpdateErr) done(comunaUpdateErr);

								// Set assertions
								(comunaUpdateRes.body._id).should.equal(comunaSaveRes.body._id);
								(comunaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Comunas if not signed in', function(done) {
		// Create new Comuna model instance
		var comunaObj = new Comuna(comuna);

		// Save the Comuna
		comunaObj.save(function() {
			// Request Comunas
			request(app).get('/comunas')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Comuna if not signed in', function(done) {
		// Create new Comuna model instance
		var comunaObj = new Comuna(comuna);

		// Save the Comuna
		comunaObj.save(function() {
			request(app).get('/comunas/' + comunaObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', comuna.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Comuna instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Comuna
				agent.post('/comunas')
					.send(comuna)
					.expect(200)
					.end(function(comunaSaveErr, comunaSaveRes) {
						// Handle Comuna save error
						if (comunaSaveErr) done(comunaSaveErr);

						// Delete existing Comuna
						agent.delete('/comunas/' + comunaSaveRes.body._id)
							.send(comuna)
							.expect(200)
							.end(function(comunaDeleteErr, comunaDeleteRes) {
								// Handle Comuna error error
								if (comunaDeleteErr) done(comunaDeleteErr);

								// Set assertions
								(comunaDeleteRes.body._id).should.equal(comunaSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Comuna instance if not signed in', function(done) {
		// Set Comuna user 
		comuna.user = user;

		// Create new Comuna model instance
		var comunaObj = new Comuna(comuna);

		// Save the Comuna
		comunaObj.save(function() {
			// Try deleting Comuna
			request(app).delete('/comunas/' + comunaObj._id)
			.expect(401)
			.end(function(comunaDeleteErr, comunaDeleteRes) {
				// Set message assertion
				(comunaDeleteRes.body.message).should.match('User is not logged in');

				// Handle Comuna error error
				done(comunaDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Comuna.remove().exec();
		done();
	});
});