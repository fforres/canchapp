'use strict';

// Fieldcompositions controller
angular.module('fieldcompositions').controller('FieldcompositionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Fieldcompositions',
	function($scope, $stateParams, $location, Authentication, Fieldcompositions) {
		$scope.authentication = Authentication;

		// Create new Fieldcomposition
		$scope.create = function() {
			// Create new Fieldcomposition object
			var fieldcomposition = new Fieldcompositions ({
				name: this.name
			});

			// Redirect after save
			fieldcomposition.$save(function(response) {
				$location.path('fieldcompositions/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Fieldcomposition
		$scope.remove = function(fieldcomposition) {
			if ( fieldcomposition ) { 
				fieldcomposition.$remove();

				for (var i in $scope.fieldcompositions) {
					if ($scope.fieldcompositions [i] === fieldcomposition) {
						$scope.fieldcompositions.splice(i, 1);
					}
				}
			} else {
				$scope.fieldcomposition.$remove(function() {
					$location.path('fieldcompositions');
				});
			}
		};

		// Update existing Fieldcomposition
		$scope.update = function() {
			var fieldcomposition = $scope.fieldcomposition;

			fieldcomposition.$update(function() {
				$location.path('fieldcompositions/' + fieldcomposition._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Fieldcompositions
		$scope.find = function() {
			$scope.fieldcompositions = Fieldcompositions.query();
		};

		// Find existing Fieldcomposition
		$scope.findOne = function() {
			$scope.fieldcomposition = Fieldcompositions.get({ 
				fieldcompositionId: $stateParams.fieldcompositionId
			});
		};
	}
]);