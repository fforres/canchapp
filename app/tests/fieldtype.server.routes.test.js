'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Fieldtype = mongoose.model('Fieldtype'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fieldtype;

/**
 * Fieldtype routes tests
 */
describe('Fieldtype CRUD tests', function() {
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

		// Save a user to the test db and create new Fieldtype
		user.save(function() {
			fieldtype = {
				name: 'Fieldtype Name'
			};

			done();
		});
	});

	it('should be able to save Fieldtype instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fieldtype
				agent.post('/fieldtypes')
					.send(fieldtype)
					.expect(200)
					.end(function(fieldtypeSaveErr, fieldtypeSaveRes) {
						// Handle Fieldtype save error
						if (fieldtypeSaveErr) done(fieldtypeSaveErr);

						// Get a list of Fieldtypes
						agent.get('/fieldtypes')
							.end(function(fieldtypesGetErr, fieldtypesGetRes) {
								// Handle Fieldtype save error
								if (fieldtypesGetErr) done(fieldtypesGetErr);

								// Get Fieldtypes list
								var fieldtypes = fieldtypesGetRes.body;

								// Set assertions
								(fieldtypes[0].user._id).should.equal(userId);
								(fieldtypes[0].name).should.match('Fieldtype Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fieldtype instance if not logged in', function(done) {
		agent.post('/fieldtypes')
			.send(fieldtype)
			.expect(401)
			.end(function(fieldtypeSaveErr, fieldtypeSaveRes) {
				// Call the assertion callback
				done(fieldtypeSaveErr);
			});
	});

	it('should not be able to save Fieldtype instance if no name is provided', function(done) {
		// Invalidate name field
		fieldtype.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fieldtype
				agent.post('/fieldtypes')
					.send(fieldtype)
					.expect(400)
					.end(function(fieldtypeSaveErr, fieldtypeSaveRes) {
						// Set message assertion
						(fieldtypeSaveRes.body.message).should.match('Please fill Fieldtype name');
						
						// Handle Fieldtype save error
						done(fieldtypeSaveErr);
					});
			});
	});

	it('should be able to update Fieldtype instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fieldtype
				agent.post('/fieldtypes')
					.send(fieldtype)
					.expect(200)
					.end(function(fieldtypeSaveErr, fieldtypeSaveRes) {
						// Handle Fieldtype save error
						if (fieldtypeSaveErr) done(fieldtypeSaveErr);

						// Update Fieldtype name
						fieldtype.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fieldtype
						agent.put('/fieldtypes/' + fieldtypeSaveRes.body._id)
							.send(fieldtype)
							.expect(200)
							.end(function(fieldtypeUpdateErr, fieldtypeUpdateRes) {
								// Handle Fieldtype update error
								if (fieldtypeUpdateErr) done(fieldtypeUpdateErr);

								// Set assertions
								(fieldtypeUpdateRes.body._id).should.equal(fieldtypeSaveRes.body._id);
								(fieldtypeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fieldtypes if not signed in', function(done) {
		// Create new Fieldtype model instance
		var fieldtypeObj = new Fieldtype(fieldtype);

		// Save the Fieldtype
		fieldtypeObj.save(function() {
			// Request Fieldtypes
			request(app).get('/fieldtypes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fieldtype if not signed in', function(done) {
		// Create new Fieldtype model instance
		var fieldtypeObj = new Fieldtype(fieldtype);

		// Save the Fieldtype
		fieldtypeObj.save(function() {
			request(app).get('/fieldtypes/' + fieldtypeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fieldtype.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fieldtype instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fieldtype
				agent.post('/fieldtypes')
					.send(fieldtype)
					.expect(200)
					.end(function(fieldtypeSaveErr, fieldtypeSaveRes) {
						// Handle Fieldtype save error
						if (fieldtypeSaveErr) done(fieldtypeSaveErr);

						// Delete existing Fieldtype
						agent.delete('/fieldtypes/' + fieldtypeSaveRes.body._id)
							.send(fieldtype)
							.expect(200)
							.end(function(fieldtypeDeleteErr, fieldtypeDeleteRes) {
								// Handle Fieldtype error error
								if (fieldtypeDeleteErr) done(fieldtypeDeleteErr);

								// Set assertions
								(fieldtypeDeleteRes.body._id).should.equal(fieldtypeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fieldtype instance if not signed in', function(done) {
		// Set Fieldtype user 
		fieldtype.user = user;

		// Create new Fieldtype model instance
		var fieldtypeObj = new Fieldtype(fieldtype);

		// Save the Fieldtype
		fieldtypeObj.save(function() {
			// Try deleting Fieldtype
			request(app).delete('/fieldtypes/' + fieldtypeObj._id)
			.expect(401)
			.end(function(fieldtypeDeleteErr, fieldtypeDeleteRes) {
				// Set message assertion
				(fieldtypeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fieldtype error error
				done(fieldtypeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Fieldtype.remove().exec();
		done();
	});
});