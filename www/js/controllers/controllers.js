(function(){
	var UIState = {};
	angular.module( 'flishup' )

	.controller('AppCtrl', [ '$scope', 'UIStates', function( $scope, UIStates ) {
			$scope.exitApp = function(){ UIStates.app.exit(); };
			$scope.goToOrigDest = function(){ UIStates.app.goToOrigDest(); };
			$scope.goToDatePicker = function(){ UIStates.app.goToDatePicker(); };
		}])

	.controller('origDest', [ '$scope', 'UIStates', function( $scope, UIStates ){
		$scope.state = {};
		$scope.state.origDestAirports = UIStates.origDest.airports;
		$scope.switchAirports = function(){ UIStates.origDest.switchAirports(); };
		$scope.pickAirports = function(){ UIStates.origDest.onPickAirports(); };
	}])

	.controller('datePicker', [ '$scope', 'UIStates', function( $scope, UIStates ){
		$scope.date = UIStates.datePicker;
		$scope.pickToday = function(){ UIStates.datePicker.pickToday() };
		$scope.pickTomorrow = function(){ UIStates.datePicker.pickTomorrow() };
	}])

	.controller('searchingFlights', [ '$scope', 'UIStates', '$timeout', 'server', function( $scope, UIStates, $timeout, server ){
		UIStates.loadingFlights.loadData( UIStates );
	}])

	.controller('flightsListCtrl', [ '$scope', '$location', 'UIStates', function( $scope, $location, UIStates ) {
		$scope.currentFlights = UIStates.flightsList.getCurrentFlights();
		$scope.view = UIStates.flightsList.getViewData();
	}])

	.controller('singleFlightCtrl',[ '$scope', '$stateParams', 'UIStates', function( $scope, $stateParams, UIStates ){
			$scope.flight = UIStates.singleFlight.getFlight( $stateParams.flightId );
			$scope.loadingCrew = true;
			UIStates.singleFlight.loadCrew( $stateParams.flightId, function loadOKCallback(){
				$scope.crew = UIStates.singleFlight.crew;
				$scope.loadingCrew = false;
			});
	}]);

})();
