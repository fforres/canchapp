'use strict';

// Tipo fields controller
angular.module('tipo-fields').controller('TipoFieldsController', ['$scope', '$stateParams', '$location', 'Authentication', 'TipoFields',
	function($scope, $stateParams, $location, Authentication, TipoFields) {
		$scope.authentication = Authentication;

		// Create new Tipo field
		$scope.create = function() {
			// Create new Tipo field object
			var tipoField = new TipoFields ({
				name: this.name
			});

			// Redirect after save
			tipoField.$save(function(response) {
				$location.path('tipo-fields/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Tipo field
		$scope.remove = function(tipoField) {
			if ( tipoField ) { 
				tipoField.$remove();

				for (var i in $scope.tipoFields) {
					if ($scope.tipoFields [i] === tipoField) {
						$scope.tipoFields.splice(i, 1);
					}
				}
			} else {
				$scope.tipoField.$remove(function() {
					$location.path('tipo-fields');
				});
			}
		};

		// Update existing Tipo field
		$scope.update = function() {
			var tipoField = $scope.tipoField;

			tipoField.$update(function() {
				$location.path('tipo-fields/' + tipoField._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tipo fields
		$scope.find = function() {
			$scope.tipoFields = TipoFields.query();
		};

		// Find existing Tipo field
		$scope.findOne = function() {
			$scope.tipoField = TipoFields.get({ 
				tipoFieldId: $stateParams.tipoFieldId
			});
		};
	}
]);