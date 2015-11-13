(function(){
    angular.module( 'flishup' )
    .controller('flightsListCtrl', [ '$scope', 'FlightsList', function( $scope, service ){
        $scope.date = service.date;
        $scope.origin = service.origin;
        $scope.destination = service.destination;
        $scope.currentFlights = service.flights;
    }]);
})();