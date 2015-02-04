'use strict';

//Fields service used to communicate Fields REST endpoints
angular.module('fields').factory('Fields', ['$resource',
    function($resource) {
        return $resource('fields/:fieldId', {
            fieldId: '@_id'
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
