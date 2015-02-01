'use strict';

// Facilities controller
angular.module('facilities').controller('FacilitiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Facilities',
	function($scope, $stateParams, $location, Authentication, Facilities) {
		$scope.authentication = Authentication;

		// Create new Facility
		$scope.create = function() {
			// Create new Facility object
			var facility = new Facilities ({
				name: this.name
			});

			// Redirect after save
			facility.$save(function(response) {
				$location.path('facilities/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Facility
		$scope.remove = function(facility) {
			if ( facility ) { 
				facility.$remove();

				for (var i in $scope.facilities) {
					if ($scope.facilities [i] === facility) {
						$scope.facilities.splice(i, 1);
					}
				}
			} else {
				$scope.facility.$remove(function() {
					$location.path('facilities');
				});
			}
		};

		// Update existing Facility
		$scope.update = function() {
			var facility = $scope.facility;

			facility.$update(function() {
				$location.path('facilities/' + facility._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Facilities
		$scope.find = function() {
			$scope.facilities = Facilities.query();
		};

		// Find existing Facility
		$scope.findOne = function() {
			$scope.facility = Facilities.get({ 
				facilityId: $stateParams.facilityId
			});
		};
	}
]);