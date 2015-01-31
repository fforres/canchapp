'use strict';

angular.module('comunas').directive('citiesSelect', [
	function() {
		return {
			template:   '<div ng-show="cities.length>0"><label class="control-label" for="pais">Ciudad</label>'+
                        '<div class="controls">'+
                            '<select class="form-control"'+
                                    'data-ng-model="city"'+
                                    'data-ng-options="city._id as city.name for city in cities"'+
                                    '>'+
                            '</select>'+
                        '</div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
			}
		};
	}
]);