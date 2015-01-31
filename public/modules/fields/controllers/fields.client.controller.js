'use strict';

// Fields controller
angular.module('fields').controller('FieldsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Fields',
	function($scope, $stateParams, $location, Authentication, Fields) {
		$scope.authentication = Authentication;

		// Create new Field
		$scope.create = function() {
			// Create new Field object
			var field = new Fields ({
				name: this.name
			});

			// Redirect after save
			field.$save(function(response) {
				$location.path('fields/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Field
		$scope.remove = function(field) {
			if ( field ) { 
				field.$remove();

				for (var i in $scope.fields) {
					if ($scope.fields [i] === field) {
						$scope.fields.splice(i, 1);
					}
				}
			} else {
				$scope.field.$remove(function() {
					$location.path('fields');
				});
			}
		};

		// Update existing Field
		$scope.update = function() {
			var field = $scope.field;

			field.$update(function() {
				$location.path('fields/' + field._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Fields
		$scope.find = function() {
			$scope.fields = Fields.query();
		};

		// Find existing Field
		$scope.findOne = function() {
			$scope.field = Fields.get({ 
				fieldId: $stateParams.fieldId
			});
		};
	}
]);