'use strict';

(function() {
	// Equipmentrentals Controller Spec
	describe('Equipmentrentals Controller Tests', function() {
		// Initialize global variables
		var EquipmentrentalsController,
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

			// Initialize the Equipmentrentals controller.
			EquipmentrentalsController = $controller('EquipmentrentalsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Equipmentrental object fetched from XHR', inject(function(Equipmentrentals) {
			// Create sample Equipmentrental using the Equipmentrentals service
			var sampleEquipmentrental = new Equipmentrentals({
				name: 'New Equipmentrental'
			});

			// Create a sample Equipmentrentals array that includes the new Equipmentrental
			var sampleEquipmentrentals = [sampleEquipmentrental];

			// Set GET response
			$httpBackend.expectGET('equipmentrentals').respond(sampleEquipmentrentals);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.equipmentrentals).toEqualData(sampleEquipmentrentals);
		}));

		it('$scope.findOne() should create an array with one Equipmentrental object fetched from XHR using a equipmentrentalId URL parameter', inject(function(Equipmentrentals) {
			// Define a sample Equipmentrental object
			var sampleEquipmentrental = new Equipmentrentals({
				name: 'New Equipmentrental'
			});

			// Set the URL parameter
			$stateParams.equipmentrentalId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/equipmentrentals\/([0-9a-fA-F]{24})$/).respond(sampleEquipmentrental);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.equipmentrental).toEqualData(sampleEquipmentrental);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Equipmentrentals) {
			// Create a sample Equipmentrental object
			var sampleEquipmentrentalPostData = new Equipmentrentals({
				name: 'New Equipmentrental'
			});

			// Create a sample Equipmentrental response
			var sampleEquipmentrentalResponse = new Equipmentrentals({
				_id: '525cf20451979dea2c000001',
				name: 'New Equipmentrental'
			});

			// Fixture mock form input values
			scope.name = 'New Equipmentrental';

			// Set POST response
			$httpBackend.expectPOST('equipmentrentals', sampleEquipmentrentalPostData).respond(sampleEquipmentrentalResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Equipmentrental was created
			expect($location.path()).toBe('/equipmentrentals/' + sampleEquipmentrentalResponse._id);
		}));

		it('$scope.update() should update a valid Equipmentrental', inject(function(Equipmentrentals) {
			// Define a sample Equipmentrental put data
			var sampleEquipmentrentalPutData = new Equipmentrentals({
				_id: '525cf20451979dea2c000001',
				name: 'New Equipmentrental'
			});

			// Mock Equipmentrental in scope
			scope.equipmentrental = sampleEquipmentrentalPutData;

			// Set PUT response
			$httpBackend.expectPUT(/equipmentrentals\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/equipmentrentals/' + sampleEquipmentrentalPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid equipmentrentalId and remove the Equipmentrental from the scope', inject(function(Equipmentrentals) {
			// Create new Equipmentrental object
			var sampleEquipmentrental = new Equipmentrentals({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Equipmentrentals array and include the Equipmentrental
			scope.equipmentrentals = [sampleEquipmentrental];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/equipmentrentals\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEquipmentrental);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.equipmentrentals.length).toBe(0);
		}));
	});
}());