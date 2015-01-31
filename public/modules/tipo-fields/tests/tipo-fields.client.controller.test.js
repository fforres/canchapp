'use strict';

(function() {
	// Tipo fields Controller Spec
	describe('Tipo fields Controller Tests', function() {
		// Initialize global variables
		var TipoFieldsController,
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

			// Initialize the Tipo fields controller.
			TipoFieldsController = $controller('TipoFieldsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Tipo field object fetched from XHR', inject(function(TipoFields) {
			// Create sample Tipo field using the Tipo fields service
			var sampleTipoField = new TipoFields({
				name: 'New Tipo field'
			});

			// Create a sample Tipo fields array that includes the new Tipo field
			var sampleTipoFields = [sampleTipoField];

			// Set GET response
			$httpBackend.expectGET('tipo-fields').respond(sampleTipoFields);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.tipoFields).toEqualData(sampleTipoFields);
		}));

		it('$scope.findOne() should create an array with one Tipo field object fetched from XHR using a tipoFieldId URL parameter', inject(function(TipoFields) {
			// Define a sample Tipo field object
			var sampleTipoField = new TipoFields({
				name: 'New Tipo field'
			});

			// Set the URL parameter
			$stateParams.tipoFieldId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/tipo-fields\/([0-9a-fA-F]{24})$/).respond(sampleTipoField);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.tipoField).toEqualData(sampleTipoField);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(TipoFields) {
			// Create a sample Tipo field object
			var sampleTipoFieldPostData = new TipoFields({
				name: 'New Tipo field'
			});

			// Create a sample Tipo field response
			var sampleTipoFieldResponse = new TipoFields({
				_id: '525cf20451979dea2c000001',
				name: 'New Tipo field'
			});

			// Fixture mock form input values
			scope.name = 'New Tipo field';

			// Set POST response
			$httpBackend.expectPOST('tipo-fields', sampleTipoFieldPostData).respond(sampleTipoFieldResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Tipo field was created
			expect($location.path()).toBe('/tipo-fields/' + sampleTipoFieldResponse._id);
		}));

		it('$scope.update() should update a valid Tipo field', inject(function(TipoFields) {
			// Define a sample Tipo field put data
			var sampleTipoFieldPutData = new TipoFields({
				_id: '525cf20451979dea2c000001',
				name: 'New Tipo field'
			});

			// Mock Tipo field in scope
			scope.tipoField = sampleTipoFieldPutData;

			// Set PUT response
			$httpBackend.expectPUT(/tipo-fields\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/tipo-fields/' + sampleTipoFieldPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid tipoFieldId and remove the Tipo field from the scope', inject(function(TipoFields) {
			// Create new Tipo field object
			var sampleTipoField = new TipoFields({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Tipo fields array and include the Tipo field
			scope.tipoFields = [sampleTipoField];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/tipo-fields\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTipoField);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.tipoFields.length).toBe(0);
		}));
	});
}());