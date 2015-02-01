'use strict';

// Fieldtypes controller
angular.module('fieldtypes').controller('FieldtypesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Fieldtypes',
	function($scope, $stateParams, $location, Authentication, Fieldtypes) {
		$scope.authentication = Authentication;

		// Create new Fieldtype
		$scope.create = function() {
			// Create new Fieldtype object
			var fieldtype = new Fieldtypes ({
				name: this.name
			});

			// Redirect after save
			fieldtype.$save(function(response) {
				$location.path('fieldtypes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Fieldtype
		$scope.remove = function(fieldtype) {
			if ( fieldtype ) { 
				fieldtype.$remove();

				for (var i in $scope.fieldtypes) {
					if ($scope.fieldtypes [i] === fieldtype) {
						$scope.fieldtypes.splice(i, 1);
					}
				}
			} else {
				$scope.fieldtype.$remove(function() {
					$location.path('fieldtypes');
				});
			}
		};

		// Update existing Fieldtype
		$scope.update = function() {
			var fieldtype = $scope.fieldtype;

			fieldtype.$update(function() {
				$location.path('fieldtypes/' + fieldtype._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Fieldtypes
		$scope.find = function() {
			$scope.fieldtypes = Fieldtypes.query();
		};

		// Find existing Fieldtype
		$scope.findOne = function() {
			$scope.fieldtype = Fieldtypes.get({ 
				fieldtypeId: $stateParams.fieldtypeId
			});
		};
	}
]);