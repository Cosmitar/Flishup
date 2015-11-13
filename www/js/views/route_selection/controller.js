(function(){
    angular.module( 'flishup' )
    .controller('origDest', [ '$scope', 'RouteSelection', function( $scope, service ){
        $scope.origDestAirports = service.airports;
        $scope.switchAirportsHandler = service.switchAirports.bind(service);
        $scope.pickAirportsHandler = service.onPickAirports.bind(service);
    }]);
})();