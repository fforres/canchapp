'use strict';

(function() {
	// Fieldcompositions Controller Spec
	describe('Fieldcompositions Controller Tests', function() {
		// Initialize global variables
		var FieldcompositionsController,
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

			// Initialize the Fieldcompositions controller.
			FieldcompositionsController = $controller('FieldcompositionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fieldcomposition object fetched from XHR', inject(function(Fieldcompositions) {
			// Create sample Fieldcomposition using the Fieldcompositions service
			var sampleFieldcomposition = new Fieldcompositions({
				name: 'New Fieldcomposition'
			});

			// Create a sample Fieldcompositions array that includes the new Fieldcomposition
			var sampleFieldcompositions = [sampleFieldcomposition];

			// Set GET response
			$httpBackend.expectGET('fieldcompositions').respond(sampleFieldcompositions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fieldcompositions).toEqualData(sampleFieldcompositions);
		}));

		it('$scope.findOne() should create an array with one Fieldcomposition object fetched from XHR using a fieldcompositionId URL parameter', inject(function(Fieldcompositions) {
			// Define a sample Fieldcomposition object
			var sampleFieldcomposition = new Fieldcompositions({
				name: 'New Fieldcomposition'
			});

			// Set the URL parameter
			$stateParams.fieldcompositionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fieldcompositions\/([0-9a-fA-F]{24})$/).respond(sampleFieldcomposition);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fieldcomposition).toEqualData(sampleFieldcomposition);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Fieldcompositions) {
			// Create a sample Fieldcomposition object
			var sampleFieldcompositionPostData = new Fieldcompositions({
				name: 'New Fieldcomposition'
			});

			// Create a sample Fieldcomposition response
			var sampleFieldcompositionResponse = new Fieldcompositions({
				_id: '525cf20451979dea2c000001',
				name: 'New Fieldcomposition'
			});

			// Fixture mock form input values
			scope.name = 'New Fieldcomposition';

			// Set POST response
			$httpBackend.expectPOST('fieldcompositions', sampleFieldcompositionPostData).respond(sampleFieldcompositionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fieldcomposition was created
			expect($location.path()).toBe('/fieldcompositions/' + sampleFieldcompositionResponse._id);
		}));

		it('$scope.update() should update a valid Fieldcomposition', inject(function(Fieldcompositions) {
			// Define a sample Fieldcomposition put data
			var sampleFieldcompositionPutData = new Fieldcompositions({
				_id: '525cf20451979dea2c000001',
				name: 'New Fieldcomposition'
			});

			// Mock Fieldcomposition in scope
			scope.fieldcomposition = sampleFieldcompositionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fieldcompositions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fieldcompositions/' + sampleFieldcompositionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fieldcompositionId and remove the Fieldcomposition from the scope', inject(function(Fieldcompositions) {
			// Create new Fieldcomposition object
			var sampleFieldcomposition = new Fieldcompositions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fieldcompositions array and include the Fieldcomposition
			scope.fieldcompositions = [sampleFieldcomposition];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fieldcompositions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFieldcomposition);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fieldcompositions.length).toBe(0);
		}));
	});
}());