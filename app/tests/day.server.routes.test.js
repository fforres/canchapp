'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Day = mongoose.model('Day'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, day;

/**
 * Day routes tests
 */
describe('Day CRUD tests', function() {
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

		// Save a user to the test db and create new Day
		user.save(function() {
			day = {
				name: 'Day Name'
			};

			done();
		});
	});

	it('should be able to save Day instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Day
				agent.post('/days')
					.send(day)
					.expect(200)
					.end(function(daySaveErr, daySaveRes) {
						// Handle Day save error
						if (daySaveErr) done(daySaveErr);

						// Get a list of Days
						agent.get('/days')
							.end(function(daysGetErr, daysGetRes) {
								// Handle Day save error
								if (daysGetErr) done(daysGetErr);

								// Get Days list
								var days = daysGetRes.body;

								// Set assertions
								(days[0].user._id).should.equal(userId);
								(days[0].name).should.match('Day Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Day instance if not logged in', function(done) {
		agent.post('/days')
			.send(day)
			.expect(401)
			.end(function(daySaveErr, daySaveRes) {
				// Call the assertion callback
				done(daySaveErr);
			});
	});

	it('should not be able to save Day instance if no name is provided', function(done) {
		// Invalidate name field
		day.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Day
				agent.post('/days')
					.send(day)
					.expect(400)
					.end(function(daySaveErr, daySaveRes) {
						// Set message assertion
						(daySaveRes.body.message).should.match('Please fill Day name');
						
						// Handle Day save error
						done(daySaveErr);
					});
			});
	});

	it('should be able to update Day instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Day
				agent.post('/days')
					.send(day)
					.expect(200)
					.end(function(daySaveErr, daySaveRes) {
						// Handle Day save error
						if (daySaveErr) done(daySaveErr);

						// Update Day name
						day.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Day
						agent.put('/days/' + daySaveRes.body._id)
							.send(day)
							.expect(200)
							.end(function(dayUpdateErr, dayUpdateRes) {
								// Handle Day update error
								if (dayUpdateErr) done(dayUpdateErr);

								// Set assertions
								(dayUpdateRes.body._id).should.equal(daySaveRes.body._id);
								(dayUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Days if not signed in', function(done) {
		// Create new Day model instance
		var dayObj = new Day(day);

		// Save the Day
		dayObj.save(function() {
			// Request Days
			request(app).get('/days')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Day if not signed in', function(done) {
		// Create new Day model instance
		var dayObj = new Day(day);

		// Save the Day
		dayObj.save(function() {
			request(app).get('/days/' + dayObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', day.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Day instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Day
				agent.post('/days')
					.send(day)
					.expect(200)
					.end(function(daySaveErr, daySaveRes) {
						// Handle Day save error
						if (daySaveErr) done(daySaveErr);

						// Delete existing Day
						agent.delete('/days/' + daySaveRes.body._id)
							.send(day)
							.expect(200)
							.end(function(dayDeleteErr, dayDeleteRes) {
								// Handle Day error error
								if (dayDeleteErr) done(dayDeleteErr);

								// Set assertions
								(dayDeleteRes.body._id).should.equal(daySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Day instance if not signed in', function(done) {
		// Set Day user 
		day.user = user;

		// Create new Day model instance
		var dayObj = new Day(day);

		// Save the Day
		dayObj.save(function() {
			// Try deleting Day
			request(app).delete('/days/' + dayObj._id)
			.expect(401)
			.end(function(dayDeleteErr, dayDeleteRes) {
				// Set message assertion
				(dayDeleteRes.body.message).should.match('User is not logged in');

				// Handle Day error error
				done(dayDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Day.remove().exec();
		done();
	});
});