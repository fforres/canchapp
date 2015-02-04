'use strict';

// Fields controller
angular.module('fields').controller('FieldsController', ['$scope', '$stateParams', '$location', 'Authentication', 'FieldsByCompany', 'Fields', 'Fieldcompositions', 'Fieldtypes', 'Fieldschedules', 'Days',
    function($scope, $stateParams, $location, Authentication, FieldsByCompany, Fields, Fieldcompositions, Fieldtypes, Fieldschedules, Days) {
        $scope.authentication = Authentication;
        $scope.companyId = $stateParams.companyId;
        $scope.fieldCompositions = Fieldcompositions.query();
        $scope.fieldTypes = Fieldtypes.query();
        $scope.days = Days.query();

        // Create new Field
        $scope.create = function() {
            console.log($scope)
            console.log($scope.days)
            console.log("///////////////////////////")

            // Create new Field object
            var field = new Fields({
                name: this.name,
                fieldComposition: this.fieldComposition._id,
                fieldType: this.fieldType._id,
                company: $scope.companyId,
                reservationTime: this.reservationTime
            });
            field.$save(function(response) {
                var responseField = response;
                var fieldschedules = [];
                var fieldId = response._id;
                _.each($scope.days, function(day, v) {
                    console.log(day)
                    if (day.open) {
                        _.each(day.schedules, function(daySchedule, v2) {
                            fieldschedules.push(new Fieldschedules({
                                field: fieldId,
                                startHour: daySchedule.beggining.getMinutes() + daySchedule.beggining.getHours() * 60,
                                endHour: daySchedule.end.getMinutes() + daySchedule.end.getHours() * 60,
                                value: daySchedule.value,
                                open: true,
                                day: day._id
                            }))
                        })
                    } else {
                        fieldschedules.push(new Fieldschedules({
                            field: fieldId,
                            startHour: 0,
                            endHour: 0,
                            value: 0,
                            open: false,
                            day: day._id
                        }))
                    }
                })

                var arrFieldShedulesId = []
                _.each(fieldschedules, function(fieldschedule, v) {
                    fieldschedule.$save(function(response) {
                        arrFieldShedulesId.push(response._id)
                        if (arrFieldShedulesId.length > 6) {
                            console.log(responseField)
                            console.log(arrFieldShedulesId)
                                //delete responseField["_id"];
                            responseField.schedules = arrFieldShedulesId;
                            responseField.$update(function() {
                                console.log('responseField')
                            }, function(errorResponse) {
                                $scope.error = errorResponse.data.message;
                            });
                        }
                    }, function(errorResponse) {
                        $scope.error = errorResponse.data.message;
                    });
                })



            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Field
        $scope.remove = function(field) {
            if (field) {
                field.$remove();

                for (var i in $scope.fields) {
                    if ($scope.fields[i] === field) {
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
                $location.path('companies/' + $scope.companyId + '/fields/' + field._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Fields
        $scope.find = function() {
            $scope.fields = Fields.get({
                companyId: $scope.companyId
            }, function(e) {
                //
            });
        };

        // Find existing Field
        $scope.findOne = function() {
            $scope.field = Fields.get({
                fieldId: $stateParams.fieldId
            });
        };

        $scope.defaultForCreation = function() {
            $scope.days = Days.query({}, function(e) {
                _.each($scope.days, function(day, v) {
                    day.open = true;
                    day.schedules = [];
                    day.schedules.push({
                        beggining: new Date(),
                        end: new Date()
                    })
                })
            });
        }

        $scope.addSchedule = function(day) {
            day.schedules.push({
                beggining: new Date(),
                end: new Date()
            })
        }
        $scope.removeSchedule = function(day, schedule) {
            day.schedules.splice(day.schedules.indexOf(schedule), 1);

        }
        $scope.daySuccess = function(e) {
            /*
            e.icon = "check";
            e.ready = true;
            */
        }

        $scope.dayError = function(e) {
            e.icon = "check";
            e.ready = true;
        }
    }
]);
