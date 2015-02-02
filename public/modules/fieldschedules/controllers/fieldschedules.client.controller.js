'use strict';

// Fieldschedules controller
angular.module('fieldschedules').controller('FieldschedulesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Fieldschedules',
	function($scope, $stateParams, $location, Authentication, Fieldschedules) {
		$scope.authentication = Authentication;

		// Create new Fieldschedule
		$scope.create = function() {
			// Create new Fieldschedule object
			var fieldschedule = new Fieldschedules ({
				name: this.name
			});

			// Redirect after save
			fieldschedule.$save(function(response) {
				$location.path('fieldschedules/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Fieldschedule
		$scope.remove = function(fieldschedule) {
			if ( fieldschedule ) { 
				fieldschedule.$remove();

				for (var i in $scope.fieldschedules) {
					if ($scope.fieldschedules [i] === fieldschedule) {
						$scope.fieldschedules.splice(i, 1);
					}
				}
			} else {
				$scope.fieldschedule.$remove(function() {
					$location.path('fieldschedules');
				});
			}
		};

		// Update existing Fieldschedule
		$scope.update = function() {
			var fieldschedule = $scope.fieldschedule;

			fieldschedule.$update(function() {
				$location.path('fieldschedules/' + fieldschedule._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Fieldschedules
		$scope.find = function() {
			$scope.fieldschedules = Fieldschedules.query();
		};

		// Find existing Fieldschedule
		$scope.findOne = function() {
			$scope.fieldschedule = Fieldschedules.get({ 
				fieldscheduleId: $stateParams.fieldscheduleId
			});
		};
	}
]);