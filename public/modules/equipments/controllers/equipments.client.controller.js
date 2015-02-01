'use strict';

// Equipments controller
angular.module('equipments').controller('EquipmentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Equipments',
	function($scope, $stateParams, $location, Authentication, Equipments) {
		$scope.authentication = Authentication;

		// Create new Equipment
		$scope.create = function() {
			// Create new Equipment object
			var equipment = new Equipments ({
				name: this.name
			});

			// Redirect after save
			equipment.$save(function(response) {
				$location.path('equipments/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Equipment
		$scope.remove = function(equipment) {
			if ( equipment ) { 
				equipment.$remove();

				for (var i in $scope.equipments) {
					if ($scope.equipments [i] === equipment) {
						$scope.equipments.splice(i, 1);
					}
				}
			} else {
				$scope.equipment.$remove(function() {
					$location.path('equipments');
				});
			}
		};

		// Update existing Equipment
		$scope.update = function() {
			var equipment = $scope.equipment;

			equipment.$update(function() {
				$location.path('equipments/' + equipment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Equipments
		$scope.find = function() {
			$scope.equipments = Equipments.query();
		};

		// Find existing Equipment
		$scope.findOne = function() {
			$scope.equipment = Equipments.get({ 
				equipmentId: $stateParams.equipmentId
			});
		};
	}
]);