'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	TipoField = mongoose.model('TipoField'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, tipoField;

/**
 * Tipo field routes tests
 */
describe('Tipo field CRUD tests', function() {
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

		// Save a user to the test db and create new Tipo field
		user.save(function() {
			tipoField = {
				name: 'Tipo field Name'
			};

			done();
		});
	});

	it('should be able to save Tipo field instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tipo field
				agent.post('/tipo-fields')
					.send(tipoField)
					.expect(200)
					.end(function(tipoFieldSaveErr, tipoFieldSaveRes) {
						// Handle Tipo field save error
						if (tipoFieldSaveErr) done(tipoFieldSaveErr);

						// Get a list of Tipo fields
						agent.get('/tipo-fields')
							.end(function(tipoFieldsGetErr, tipoFieldsGetRes) {
								// Handle Tipo field save error
								if (tipoFieldsGetErr) done(tipoFieldsGetErr);

								// Get Tipo fields list
								var tipoFields = tipoFieldsGetRes.body;

								// Set assertions
								(tipoFields[0].user._id).should.equal(userId);
								(tipoFields[0].name).should.match('Tipo field Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Tipo field instance if not logged in', function(done) {
		agent.post('/tipo-fields')
			.send(tipoField)
			.expect(401)
			.end(function(tipoFieldSaveErr, tipoFieldSaveRes) {
				// Call the assertion callback
				done(tipoFieldSaveErr);
			});
	});

	it('should not be able to save Tipo field instance if no name is provided', function(done) {
		// Invalidate name field
		tipoField.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tipo field
				agent.post('/tipo-fields')
					.send(tipoField)
					.expect(400)
					.end(function(tipoFieldSaveErr, tipoFieldSaveRes) {
						// Set message assertion
						(tipoFieldSaveRes.body.message).should.match('Please fill Tipo field name');
						
						// Handle Tipo field save error
						done(tipoFieldSaveErr);
					});
			});
	});

	it('should be able to update Tipo field instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tipo field
				agent.post('/tipo-fields')
					.send(tipoField)
					.expect(200)
					.end(function(tipoFieldSaveErr, tipoFieldSaveRes) {
						// Handle Tipo field save error
						if (tipoFieldSaveErr) done(tipoFieldSaveErr);

						// Update Tipo field name
						tipoField.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Tipo field
						agent.put('/tipo-fields/' + tipoFieldSaveRes.body._id)
							.send(tipoField)
							.expect(200)
							.end(function(tipoFieldUpdateErr, tipoFieldUpdateRes) {
								// Handle Tipo field update error
								if (tipoFieldUpdateErr) done(tipoFieldUpdateErr);

								// Set assertions
								(tipoFieldUpdateRes.body._id).should.equal(tipoFieldSaveRes.body._id);
								(tipoFieldUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Tipo fields if not signed in', function(done) {
		// Create new Tipo field model instance
		var tipoFieldObj = new TipoField(tipoField);

		// Save the Tipo field
		tipoFieldObj.save(function() {
			// Request Tipo fields
			request(app).get('/tipo-fields')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Tipo field if not signed in', function(done) {
		// Create new Tipo field model instance
		var tipoFieldObj = new TipoField(tipoField);

		// Save the Tipo field
		tipoFieldObj.save(function() {
			request(app).get('/tipo-fields/' + tipoFieldObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', tipoField.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Tipo field instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Tipo field
				agent.post('/tipo-fields')
					.send(tipoField)
					.expect(200)
					.end(function(tipoFieldSaveErr, tipoFieldSaveRes) {
						// Handle Tipo field save error
						if (tipoFieldSaveErr) done(tipoFieldSaveErr);

						// Delete existing Tipo field
						agent.delete('/tipo-fields/' + tipoFieldSaveRes.body._id)
							.send(tipoField)
							.expect(200)
							.end(function(tipoFieldDeleteErr, tipoFieldDeleteRes) {
								// Handle Tipo field error error
								if (tipoFieldDeleteErr) done(tipoFieldDeleteErr);

								// Set assertions
								(tipoFieldDeleteRes.body._id).should.equal(tipoFieldSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Tipo field instance if not signed in', function(done) {
		// Set Tipo field user 
		tipoField.user = user;

		// Create new Tipo field model instance
		var tipoFieldObj = new TipoField(tipoField);

		// Save the Tipo field
		tipoFieldObj.save(function() {
			// Try deleting Tipo field
			request(app).delete('/tipo-fields/' + tipoFieldObj._id)
			.expect(401)
			.end(function(tipoFieldDeleteErr, tipoFieldDeleteRes) {
				// Set message assertion
				(tipoFieldDeleteRes.body.message).should.match('User is not logged in');

				// Handle Tipo field error error
				done(tipoFieldDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		TipoField.remove().exec();
		done();
	});
});