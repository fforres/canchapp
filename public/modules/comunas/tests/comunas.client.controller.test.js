'use strict';

(function() {
	// Comunas Controller Spec
	describe('Comunas Controller Tests', function() {
		// Initialize global variables
		var ComunasController,
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

			// Initialize the Comunas controller.
			ComunasController = $controller('ComunasController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Comuna object fetched from XHR', inject(function(Comunas) {
			// Create sample Comuna using the Comunas service
			var sampleComuna = new Comunas({
				name: 'New Comuna'
			});

			// Create a sample Comunas array that includes the new Comuna
			var sampleComunas = [sampleComuna];

			// Set GET response
			$httpBackend.expectGET('comunas').respond(sampleComunas);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.comunas).toEqualData(sampleComunas);
		}));

		it('$scope.findOne() should create an array with one Comuna object fetched from XHR using a comunaId URL parameter', inject(function(Comunas) {
			// Define a sample Comuna object
			var sampleComuna = new Comunas({
				name: 'New Comuna'
			});

			// Set the URL parameter
			$stateParams.comunaId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/comunas\/([0-9a-fA-F]{24})$/).respond(sampleComuna);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.comuna).toEqualData(sampleComuna);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Comunas) {
			// Create a sample Comuna object
			var sampleComunaPostData = new Comunas({
				name: 'New Comuna'
			});

			// Create a sample Comuna response
			var sampleComunaResponse = new Comunas({
				_id: '525cf20451979dea2c000001',
				name: 'New Comuna'
			});

			// Fixture mock form input values
			scope.name = 'New Comuna';

			// Set POST response
			$httpBackend.expectPOST('comunas', sampleComunaPostData).respond(sampleComunaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Comuna was created
			expect($location.path()).toBe('/comunas/' + sampleComunaResponse._id);
		}));

		it('$scope.update() should update a valid Comuna', inject(function(Comunas) {
			// Define a sample Comuna put data
			var sampleComunaPutData = new Comunas({
				_id: '525cf20451979dea2c000001',
				name: 'New Comuna'
			});

			// Mock Comuna in scope
			scope.comuna = sampleComunaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/comunas\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/comunas/' + sampleComunaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid comunaId and remove the Comuna from the scope', inject(function(Comunas) {
			// Create new Comuna object
			var sampleComuna = new Comunas({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Comunas array and include the Comuna
			scope.comunas = [sampleComuna];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/comunas\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleComuna);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.comunas.length).toBe(0);
		}));
	});
}());