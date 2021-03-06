'use strict';

(function() {
	// Equipments Controller Spec
	describe('Equipments Controller Tests', function() {
		// Initialize global variables
		var EquipmentsController,
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

			// Initialize the Equipments controller.
			EquipmentsController = $controller('EquipmentsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Equipment object fetched from XHR', inject(function(Equipments) {
			// Create sample Equipment using the Equipments service
			var sampleEquipment = new Equipments({
				name: 'New Equipment'
			});

			// Create a sample Equipments array that includes the new Equipment
			var sampleEquipments = [sampleEquipment];

			// Set GET response
			$httpBackend.expectGET('equipments').respond(sampleEquipments);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.equipments).toEqualData(sampleEquipments);
		}));

		it('$scope.findOne() should create an array with one Equipment object fetched from XHR using a equipmentId URL parameter', inject(function(Equipments) {
			// Define a sample Equipment object
			var sampleEquipment = new Equipments({
				name: 'New Equipment'
			});

			// Set the URL parameter
			$stateParams.equipmentId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/equipments\/([0-9a-fA-F]{24})$/).respond(sampleEquipment);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.equipment).toEqualData(sampleEquipment);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Equipments) {
			// Create a sample Equipment object
			var sampleEquipmentPostData = new Equipments({
				name: 'New Equipment'
			});

			// Create a sample Equipment response
			var sampleEquipmentResponse = new Equipments({
				_id: '525cf20451979dea2c000001',
				name: 'New Equipment'
			});

			// Fixture mock form input values
			scope.name = 'New Equipment';

			// Set POST response
			$httpBackend.expectPOST('equipments', sampleEquipmentPostData).respond(sampleEquipmentResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Equipment was created
			expect($location.path()).toBe('/equipments/' + sampleEquipmentResponse._id);
		}));

		it('$scope.update() should update a valid Equipment', inject(function(Equipments) {
			// Define a sample Equipment put data
			var sampleEquipmentPutData = new Equipments({
				_id: '525cf20451979dea2c000001',
				name: 'New Equipment'
			});

			// Mock Equipment in scope
			scope.equipment = sampleEquipmentPutData;

			// Set PUT response
			$httpBackend.expectPUT(/equipments\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/equipments/' + sampleEquipmentPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid equipmentId and remove the Equipment from the scope', inject(function(Equipments) {
			// Create new Equipment object
			var sampleEquipment = new Equipments({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Equipments array and include the Equipment
			scope.equipments = [sampleEquipment];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/equipments\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEquipment);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.equipments.length).toBe(0);
		}));
	});
}());