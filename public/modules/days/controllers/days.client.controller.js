'use strict';

// Days controller
angular.module('days').controller('DaysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Days',
	function($scope, $stateParams, $location, Authentication, Days) {
		$scope.authentication = Authentication;

		// Create new Day
		$scope.create = function() {
			// Create new Day object
			var day = new Days ({
				name: this.name,
				number: this.number
			});

			// Redirect after save
			day.$save(function(response) {
				$location.path('days/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Day
		$scope.remove = function(day) {
			if ( day ) { 
				day.$remove();

				for (var i in $scope.days) {
					if ($scope.days [i] === day) {
						$scope.days.splice(i, 1);
					}
				}
			} else {
				$scope.day.$remove(function() {
					$location.path('days');
				});
			}
		};

		// Update existing Day
		$scope.update = function() {
			var day = $scope.day;

			day.$update(function() {
				$location.path('days/' + day._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Days
		$scope.find = function() {
			$scope.days = Days.query();
		};

		// Find existing Day
		$scope.findOne = function() {
			$scope.day = Days.get({ 
				dayId: $stateParams.dayId
			});
		};
	}
]);