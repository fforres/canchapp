'use strict';

(function() {
	// Fields Controller Spec
	describe('Fields Controller Tests', function() {
		// Initialize global variables
		var FieldsController,
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

			// Initialize the Fields controller.
			FieldsController = $controller('FieldsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Field object fetched from XHR', inject(function(Fields) {
			// Create sample Field using the Fields service
			var sampleField = new Fields({
				name: 'New Field'
			});

			// Create a sample Fields array that includes the new Field
			var sampleFields = [sampleField];

			// Set GET response
			$httpBackend.expectGET('fields').respond(sampleFields);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fields).toEqualData(sampleFields);
		}));

		it('$scope.findOne() should create an array with one Field object fetched from XHR using a fieldId URL parameter', inject(function(Fields) {
			// Define a sample Field object
			var sampleField = new Fields({
				name: 'New Field'
			});

			// Set the URL parameter
			$stateParams.fieldId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fields\/([0-9a-fA-F]{24})$/).respond(sampleField);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.field).toEqualData(sampleField);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Fields) {
			// Create a sample Field object
			var sampleFieldPostData = new Fields({
				name: 'New Field'
			});

			// Create a sample Field response
			var sampleFieldResponse = new Fields({
				_id: '525cf20451979dea2c000001',
				name: 'New Field'
			});

			// Fixture mock form input values
			scope.name = 'New Field';

			// Set POST response
			$httpBackend.expectPOST('fields', sampleFieldPostData).respond(sampleFieldResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Field was created
			expect($location.path()).toBe('/fields/' + sampleFieldResponse._id);
		}));

		it('$scope.update() should update a valid Field', inject(function(Fields) {
			// Define a sample Field put data
			var sampleFieldPutData = new Fields({
				_id: '525cf20451979dea2c000001',
				name: 'New Field'
			});

			// Mock Field in scope
			scope.field = sampleFieldPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fields\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fields/' + sampleFieldPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fieldId and remove the Field from the scope', inject(function(Fields) {
			// Create new Field object
			var sampleField = new Fields({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fields array and include the Field
			scope.fields = [sampleField];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fields\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleField);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fields.length).toBe(0);
		}));
	});
}());