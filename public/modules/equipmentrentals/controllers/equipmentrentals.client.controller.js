'use strict';

// Equipmentrentals controller
angular.module('equipmentrentals').controller('EquipmentrentalsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Equipmentrentals',
	function($scope, $stateParams, $location, Authentication, Equipmentrentals) {
		$scope.authentication = Authentication;

		// Create new Equipmentrental
		$scope.create = function() {
			// Create new Equipmentrental object
			var equipmentrental = new Equipmentrentals ({
				name: this.name
			});

			// Redirect after save
			equipmentrental.$save(function(response) {
				$location.path('equipmentrentals/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Equipmentrental
		$scope.remove = function(equipmentrental) {
			if ( equipmentrental ) { 
				equipmentrental.$remove();

				for (var i in $scope.equipmentrentals) {
					if ($scope.equipmentrentals [i] === equipmentrental) {
						$scope.equipmentrentals.splice(i, 1);
					}
				}
			} else {
				$scope.equipmentrental.$remove(function() {
					$location.path('equipmentrentals');
				});
			}
		};

		// Update existing Equipmentrental
		$scope.update = function() {
			var equipmentrental = $scope.equipmentrental;

			equipmentrental.$update(function() {
				$location.path('equipmentrentals/' + equipmentrental._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Equipmentrentals
		$scope.find = function() {
			$scope.equipmentrentals = Equipmentrentals.query();
		};

		// Find existing Equipmentrental
		$scope.findOne = function() {
			$scope.equipmentrental = Equipmentrentals.get({ 
				equipmentrentalId: $stateParams.equipmentrentalId
			});
		};
	}
]);