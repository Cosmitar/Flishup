(function(){
    angular.module( 'flishup' )
    .controller('singleFlightCtrl', [ '$scope', 'SingleFlight', function( $scope, service ){
        service.loadFlight();
        $scope.flight = service.flight;
        $scope.getCrew = service.getCrew.bind(service);
        $scope.isLoadingCrew = service.isLoadingCrew.bind(service);
    }]);
})();