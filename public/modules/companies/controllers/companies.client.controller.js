'use strict';

// Companies controller
angular.module('companies').controller('CompaniesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Companies', 'Countries', 'CountriesCities', 'CitiesComunas',
    function($scope, $stateParams, $location, Authentication, Companies, Countries, CountriesCities, CitiesComunas) {
        $scope.authentication = Authentication;
        $scope.countries = Countries.query();
        // Create new Company
        $scope.create = function() {
            // Create new Company object
            var company = new Companies({
                name: this.name,
                address: this.address,
                email: this.email,
                phone: this.phone,
                geoloc_x: this.geoloc_x,
                geoloc_y: this.geoloc_y,
                comuna: this.comuna._id,
                city: this.city._id,
                country: this.country._id,
                iscafeteria: this.iscafeteria,
                isnecesariosersocio: this.isnecesariosersocio
            });
            /*
            company.$save(function(response) {
                // Redirect after save
                $location.path('companies/' + response._id);

                // Clear form fields
                $scope.name = ''
                $scope.address = ''
                $scope.email = ''
                $scope.phone = ''
                $scope.geolox_x = ''
                $scope.geolox_y = ''
                $scope.comuna = ''
                $scope.city = ''
                $scope.country = ''
                $scope.iscafeteria, = false
                $scope.isnecesariosersocio = false
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
            */
        };
        // Remove existing Company
        $scope.remove = function(company) {
            if (company) {
                company.$remove();
                for (var i in $scope.companies) {
                    if ($scope.companies[i] === company) {
                        $scope.companies.splice(i, 1);
                    }
                }
            } else {
                $scope.company.$remove(function() {
                    $location.path('companies');
                });
            }
        };
        // Update existing Company
        $scope.update = function() {
            var company = $scope.company;
            company.$update(function() {
                $location.path('companies/' + company._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        // Find a list of Companies
        $scope.find = function() {
            $scope.companies = Companies.query();
        };
        // Find a list of Cities by Country selected
        $scope.findCitiesByCountry = function(country) {
            $scope.cities = CountriesCities.get({
                countryId: country._id
            })
        };
        $scope.findComunasByCity = function(city) {
            $scope.comunas = CitiesComunas.get({
                cityId: city._id
            })
        };
        $scope.findMapLocation = function() {
            $scope.showmap = true;
            $scope.geocoder = new google.maps.Geocoder();
            var mapOptions = {
                zoom: 15,
                center: new google.maps.LatLng(0, 0)
            };
            $scope.map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
            $scope.codeAddress()
        };
        $scope.codeAddress = function() {
            var address = $scope.country.name + ", " + $scope.city.name + ", " + $scope.comuna.name + ", " + $scope.address;
            console.log(address)
            $scope.geocoder.geocode({
                'address': address
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    $scope.map.setCenter(results[0].geometry.location);
                    $scope.marker = new google.maps.Marker({
                        map: $scope.map,
                        position: results[0].geometry.location,
                        draggable: true,
                        title: $scope.name
                    });

                    $scope.geoloc_x = $scope.marker.position.D;
                    $scope.geoloc_y = $scope.marker.position.k;

                    google.maps.event.addListener($scope.marker, 'dragend', function() {
                        console.log(this)
                        $scope.geoloc_x = $scope.marker.position.D;
                        $scope.geoloc_y = $scope.marker.position.k;
                    })
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        };
        // Find existing Company
        $scope.findOne = function() {
            $scope.company = Companies.get({
                companyId: $stateParams.companyId
            });
        };
    }
]);
