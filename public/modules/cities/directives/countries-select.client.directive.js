'use strict';

angular.module('cities').directive('countriesSelectCities', [
	function() {
		return {
			template:   '<label class="control-label" for="pais">Pais</label>'+
                        '<div class="controls">'+
                            '<select class="form-control"'+
                                    'data-ng-model="country"'+
                                    'data-ng-options="country._id as country.name for country in countries"'+
                                    '>'+
                            '</select>'+
                        '</div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);