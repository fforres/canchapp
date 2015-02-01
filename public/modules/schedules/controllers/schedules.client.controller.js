'use strict';

// Schedules controller
angular.module('schedules').controller('SchedulesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Schedules',
    function($scope, $stateParams, $location, Authentication, Schedules) {
        $scope.authentication = Authentication;
        $scope.companyId = $stateParams.companyId;
		$scope.hoursOptions = [{txt:'00:00', int: 0},{txt:'00:15', int: 15},{txt:'00:30', int: 30},{txt:'00:45', int: 45},{txt:'01:00', int: 60},{txt:'01:15', int: 75},{txt:'01:30', int: 90},{txt:'01:45', int: 105},{txt:'02:00', int: 120},{txt:'02:15', int: 135},{txt:'02:30', int: 150},{txt:'02:45', int: 165},{txt:'03:00', int: 180},{txt:'03:15', int: 195},{txt:'03:30', int: 210},{txt:'03:45', int: 225},{txt:'04:00', int: 240},{txt:'04:15', int: 255},{txt:'04:30', int: 270},{txt:'04:45', int: 285},{txt:'05:00', int: 300},{txt:'05:15', int: 315},{txt:'05:30', int: 330},{txt:'05:45', int: 345},{txt:'06:00', int: 360},{txt:'06:15', int: 375},{txt:'06:30', int: 390},{txt:'06:45', int: 405},{txt:'07:00', int: 420},{txt:'07:15', int: 435},{txt:'07:30', int: 450},{txt:'07:45', int: 465},{txt:'08:00', int: 480},{txt:'08:15', int: 495},{txt:'08:30', int: 510},{txt:'08:45', int: 525},{txt:'09:00', int: 540},{txt:'09:15', int: 555},{txt:'09:30', int: 570},{txt:'09:45', int: 585},{txt:'10:00', int: 600},{txt:'10:15', int: 615},{txt:'10:30', int: 630},{txt:'10:45', int: 645},{txt:'11:00', int: 660},{txt:'11:15', int: 675},{txt:'11:30', int: 690},{txt:'11:45', int: 705},{txt:'12:00', int: 720},{txt:'12:15', int: 735},{txt:'12:30', int: 750},{txt:'12:45', int: 765},{txt:'13:00', int: 780},{txt:'13:15', int: 795},{txt:'13:30', int: 810},{txt:'13:45', int: 825},{txt:'14:00', int: 840},{txt:'14:15', int: 855},{txt:'14:30', int: 870},{txt:'14:45', int: 885},{txt:'15:00', int: 900},{txt:'15:15', int: 915},{txt:'15:30', int: 930},{txt:'15:45', int: 945},{txt:'16:00', int: 960},{txt:'16:15', int: 975},{txt:'16:30', int: 990},{txt:'16:45', int: 1005},{txt:'17:00', int: 1020},{txt:'17:15', int: 1035},{txt:'17:30', int: 1050},{txt:'17:45', int: 1065},{txt:'18:00', int: 1080},{txt:'18:15', int: 1095},{txt:'18:30', int: 1110},{txt:'18:45', int: 1125},{txt:'19:00', int: 1140},{txt:'19:15', int: 1155},{txt:'19:30', int: 1170},{txt:'19:45', int: 1185},{txt:'20:00', int: 1200},{txt:'20:15', int: 1215},{txt:'20:30', int: 1230},{txt:'20:45', int: 1245},{txt:'21:00', int: 1260},{txt:'21:15', int: 1275},{txt:'21:30', int: 1290},{txt:'21:45', int: 1305},{txt:'22:00', int: 1320},{txt:'22:15', int: 1335},{txt:'22:30', int: 1350},{txt:'22:45', int: 1365},{txt:'23:00', int: 1380},{txt:'23:15', int: 1395},{txt:'23:30', int: 1410},{txt:'23:45', int: 1425}]
		$scope.daysSemana = [{day:'Lunes'},{day:'Martes'},{day:'Miercoles'},{day:'Jueves'},{day:'Viernes'}]
		$scope.daysFinde = [{day:'Sabado'},{day:'Domingo'}]
		console.log($scope)
        // Create new Schedule
        $scope.create = function() {
            // Create new Schedule object
            var schedule = new Schedules({
                name: this.name
            });

            console.log($scope)

            // Redirect after save
            /*
            schedule.$save(function(response) {
                $location.path('schedules/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
            */
        };

        // Remove existing Schedule
        $scope.remove = function(schedule) {
            if (schedule) {
                schedule.$remove();

                for (var i in $scope.schedules) {
                    if ($scope.schedules[i] === schedule) {
                        $scope.schedules.splice(i, 1);
                    }
                }
            } else {
                $scope.schedule.$remove(function() {
                    $location.path('schedules');
                });
            }
        };

        // Update existing Schedule
        $scope.update = function() {
            var schedule = $scope.schedule;

            schedule.$update(function() {
                $location.path('companies/' + $scope.companyId + '/schedules/' + schedule._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.dayClicked = function(k,day,$event){
        	if(!day.selected){
	        	day.selected = true
        	}else{
        		day.selected = false
        	}
        	console.log($scope)
        }
        // Find a list of Schedules
        $scope.find = function() {
            $scope.schedules = Schedules.get({
                companyId: $scope.companyId
            });
        };

        // Find existing Schedule
        $scope.findOne = function() {
            $scope.schedule = Schedules.get({
                scheduleId: $stateParams.scheduleId
            });
        };
    }
]);
