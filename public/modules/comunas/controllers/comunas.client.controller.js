'use strict';
 
// Comunas controller
angular.module('comunas').controller('ComunasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Comunas', 'Cities', 'Countries', 'CountriesCities',
	function($scope, $stateParams, $location, Authentication, Comunas, Cities ,Countries, CountriesCities) {
		$scope.authentication = Authentication;
        $scope.countries = Countries.query();
		// Create new Comuna
		$scope.create = function() {
			// Create new Comuna object
			var comuna = new Comunas ({
				name: this.name,
				country: this.country,
				city: this.city
			});
			// Redirect after save 
			comuna.$save(function(response) {
				$location.path('comunas/' + response._id);
				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		// Remove existing Comuna
		$scope.remove = function(comuna) {
			if ( comuna ) { 
				comuna.$remove();
				for (var i in $scope.comunas) {
					if ($scope.comunas [i] === comuna) {
						$scope.comunas.splice(i, 1);
					}
				}
			} else {
				$scope.comuna.$remove(function() {
					$location.path('comunas');
				});
			}
		};

		// Update existing Comuna
		$scope.update = function() {
			var comuna = $scope.comuna;

			comuna.$update(function() {
				$location.path('comunas/' + comuna._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Comunas
		$scope.find = function() {
			$scope.comunas = Comunas.query();
		};
		
		// Find a list of Cities by Country selected
        $scope.findCitiesByCountry = function(country){
            console.log($scope)
            console.log(country)
            //$scope.country = country
            $scope.cities = CountriesCities.get({
                countryId : country
            })
        }
		// Find existing Comuna
		$scope.findOne = function() {
			$scope.comuna = Comunas.get({ 
				comunaId: $stateParams.comunaId
			});
		};
	}
]);