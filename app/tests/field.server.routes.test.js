'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Field = mongoose.model('Field'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, field;

/**
 * Field routes tests
 */
describe('Field CRUD tests', function() {
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

		// Save a user to the test db and create new Field
		user.save(function() {
			field = {
				name: 'Field Name'
			};

			done();
		});
	});

	it('should be able to save Field instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Field
				agent.post('/fields')
					.send(field)
					.expect(200)
					.end(function(fieldSaveErr, fieldSaveRes) {
						// Handle Field save error
						if (fieldSaveErr) done(fieldSaveErr);

						// Get a list of Fields
						agent.get('/fields')
							.end(function(fieldsGetErr, fieldsGetRes) {
								// Handle Field save error
								if (fieldsGetErr) done(fieldsGetErr);

								// Get Fields list
								var fields = fieldsGetRes.body;

								// Set assertions
								(fields[0].user._id).should.equal(userId);
								(fields[0].name).should.match('Field Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Field instance if not logged in', function(done) {
		agent.post('/fields')
			.send(field)
			.expect(401)
			.end(function(fieldSaveErr, fieldSaveRes) {
				// Call the assertion callback
				done(fieldSaveErr);
			});
	});

	it('should not be able to save Field instance if no name is provided', function(done) {
		// Invalidate name field
		field.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Field
				agent.post('/fields')
					.send(field)
					.expect(400)
					.end(function(fieldSaveErr, fieldSaveRes) {
						// Set message assertion
						(fieldSaveRes.body.message).should.match('Please fill Field name');
						
						// Handle Field save error
						done(fieldSaveErr);
					});
			});
	});

	it('should be able to update Field instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Field
				agent.post('/fields')
					.send(field)
					.expect(200)
					.end(function(fieldSaveErr, fieldSaveRes) {
						// Handle Field save error
						if (fieldSaveErr) done(fieldSaveErr);

						// Update Field name
						field.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Field
						agent.put('/fields/' + fieldSaveRes.body._id)
							.send(field)
							.expect(200)
							.end(function(fieldUpdateErr, fieldUpdateRes) {
								// Handle Field update error
								if (fieldUpdateErr) done(fieldUpdateErr);

								// Set assertions
								(fieldUpdateRes.body._id).should.equal(fieldSaveRes.body._id);
								(fieldUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fields if not signed in', function(done) {
		// Create new Field model instance
		var fieldObj = new Field(field);

		// Save the Field
		fieldObj.save(function() {
			// Request Fields
			request(app).get('/fields')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Field if not signed in', function(done) {
		// Create new Field model instance
		var fieldObj = new Field(field);

		// Save the Field
		fieldObj.save(function() {
			request(app).get('/fields/' + fieldObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', field.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Field instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Field
				agent.post('/fields')
					.send(field)
					.expect(200)
					.end(function(fieldSaveErr, fieldSaveRes) {
						// Handle Field save error
						if (fieldSaveErr) done(fieldSaveErr);

						// Delete existing Field
						agent.delete('/fields/' + fieldSaveRes.body._id)
							.send(field)
							.expect(200)
							.end(function(fieldDeleteErr, fieldDeleteRes) {
								// Handle Field error error
								if (fieldDeleteErr) done(fieldDeleteErr);

								// Set assertions
								(fieldDeleteRes.body._id).should.equal(fieldSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Field instance if not signed in', function(done) {
		// Set Field user 
		field.user = user;

		// Create new Field model instance
		var fieldObj = new Field(field);

		// Save the Field
		fieldObj.save(function() {
			// Try deleting Field
			request(app).delete('/fields/' + fieldObj._id)
			.expect(401)
			.end(function(fieldDeleteErr, fieldDeleteRes) {
				// Set message assertion
				(fieldDeleteRes.body.message).should.match('User is not logged in');

				// Handle Field error error
				done(fieldDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Field.remove().exec();
		done();
	});
});