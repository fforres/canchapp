'use strict';

(function() {
	// Days Controller Spec
	describe('Days Controller Tests', function() {
		// Initialize global variables
		var DaysController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Days controller.
			DaysController = $controller('DaysController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Day object fetched from XHR', inject(function(Days) {
			// Create sample Day using the Days service
			var sampleDay = new Days({
				name: 'New Day'
			});

			// Create a sample Days array that includes the new Day
			var sampleDays = [sampleDay];

			// Set GET response
			$httpBackend.expectGET('days').respond(sampleDays);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.days).toEqualData(sampleDays);
		}));

		it('$scope.findOne() should create an array with one Day object fetched from XHR using a dayId URL parameter', inject(function(Days) {
			// Define a sample Day object
			var sampleDay = new Days({
				name: 'New Day'
			});

			// Set the URL parameter
			$stateParams.dayId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/days\/([0-9a-fA-F]{24})$/).respond(sampleDay);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.day).toEqualData(sampleDay);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Days) {
			// Create a sample Day object
			var sampleDayPostData = new Days({
				name: 'New Day'
			});

			// Create a sample Day response
			var sampleDayResponse = new Days({
				_id: '525cf20451979dea2c000001',
				name: 'New Day'
			});

			// Fixture mock form input values
			scope.name = 'New Day';

			// Set POST response
			$httpBackend.expectPOST('days', sampleDayPostData).respond(sampleDayResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Day was created
			expect($location.path()).toBe('/days/' + sampleDayResponse._id);
		}));

		it('$scope.update() should update a valid Day', inject(function(Days) {
			// Define a sample Day put data
			var sampleDayPutData = new Days({
				_id: '525cf20451979dea2c000001',
				name: 'New Day'
			});

			// Mock Day in scope
			scope.day = sampleDayPutData;

			// Set PUT response
			$httpBackend.expectPUT(/days\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/days/' + sampleDayPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid dayId and remove the Day from the scope', inject(function(Days) {
			// Create new Day object
			var sampleDay = new Days({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Days array and include the Day
			scope.days = [sampleDay];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/days\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDay);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.days.length).toBe(0);
		}));
	});
}());