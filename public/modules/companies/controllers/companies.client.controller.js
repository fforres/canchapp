'use strict';

// Companies controller
angular.module('companies').controller('CompaniesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Companies',  'FieldsByCompany', 'Countries', 'CountriesCities', 'CitiesComunas',
    function($scope, $stateParams, $location, Authentication, Companies, FieldsByCompany, Countries, CountriesCities, CitiesComunas) {
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
            company.$save(function(response) {

                // Redirect after save
                $location.path('companies/' + response._id);

                // Clear form fields
                $scope.name = '';
                $scope.address = '';
                $scope.email = '';
                $scope.phone = '';
                $scope.geolox_x = '';
                $scope.geolox_y = '';
                $scope.comuna = '';
                $scope.city = '';
                $scope.country = '';
                $scope.iscafeteria = false;
                $scope.isnecesariosersocio = false;

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

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
            var company = new Companies({
                _id: $scope.company._id,
                name: $scope.company.name,
                address: $scope.company.address,
                email: $scope.company.email,
                phone: $scope.company.phone,
                geoloc_x: $scope.company.geoloc_x,
                geoloc_y: $scope.company.geoloc_y,
                comuna: $scope.company.comuna._id,
                city: $scope.company.city._id,
                country: $scope.company.country._id,
                iscafeteria: $scope.company.iscafeteria,
                isnecesariosersocio: $scope.company.isnecesariosersocio
            });
            console.log($scope)
            console.log(company)
            company.$update(function() {
                $location.path('companies/' + company._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        // Find a list of Companies
        $scope.find = function() {
            $scope.companies = FieldsByCompany.query(function() {});
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
            console.log($scope)
            $scope.geocoder = new google.maps.Geocoder();


            var mapOptions = {
                zoom: 15,
                center: new google.maps.LatLng(0, 0)
            }

            $scope.map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
            $scope.codeAddress()
        };
        $scope.codeAddress = function() {
            if ($scope.company) {
                var address = $scope.company.country.name + ", " + $scope.company.city.name + ", " + $scope.company.comuna.name + ", " + $scope.address;
                $scope.geocoder.geocode({
                    'address': address
                }, function(results, status) {
                    var centroDelMapa = new google.maps.LatLng(0, 0)
                    if ($scope.company && $scope.company.geoloc_x != 0 && $scope.company.geoloc_y != 0) {
                        centroDelMapa = new google.maps.LatLng($scope.company.geoloc_y, $scope.company.geoloc_x);
                    } else if (status == google.maps.GeocoderStatus.OK) {
                        centroDelMapa = results[0].geometry.location
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                        return;
                    }
                    $scope.map.setCenter(centroDelMapa);
                    $scope.marker = new google.maps.Marker({
                        map: $scope.map,
                        position: centroDelMapa,
                        draggable: true,
                        title: $scope.name
                    });

                    $scope.company.geoloc_x = $scope.marker.position.D;
                    $scope.company.geoloc_y = $scope.marker.position.k;

                    google.maps.event.addListener($scope.marker, 'dragend', function() {
                        console.log(this)
                        $scope.company.geoloc_x = this.position.D;
                        $scope.company.geoloc_y = this.position.k;
                    })
                });
            } else {
                var address = $scope.country.name + ", " + $scope.city.name + ", " + $scope.comuna.name + ", " + $scope.address;
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
                            $scope.geoloc_x = this.position.D;
                            $scope.geoloc_y = this.position.k;
                        })
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }

        };
        // Find existing Company
        $scope.findOne = function() {
            $scope.company = FieldsByCompany.get({
                companyId: $stateParams.companyId
            }, function(e) {
                console.log(e)
            });
        };
    }
]);
