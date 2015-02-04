'use strict';

//Companies service used to communicate Companies REST endpoints
angular.module('companies').factory('Companies', ['$resource',
    function($resource) {
        return $resource('companies/:companyId', {
            companyId: '@_id'
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
angular.module('companies').factory('FieldsByCompany', ['$resource',
    function($resource) {
        return $resource('companies/:companyId/fields/:fieldId', {
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
