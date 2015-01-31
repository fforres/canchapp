'use strict';

//Cities service used to communicate Cities REST endpoints
angular.module('cities')
    .factory('Cities', ['$resource',
        function($resource) {
            return $resource('cities/:cityId', {
                cityId: '@_id'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ])
    .factory('CitiesComunas', ['$resource',
        function($resource) {
            return $resource('cities/:cityId/comunas', {
                cityId: '@_id'
            }, {
                update: {
                    method: 'PUT'
                },
                get: {
                    method: 'GET',
                    isArray: true
                }
            });
        }
    ]);
