(function(){
    angular.module( 'flishup' )
    .directive('fsLoadFlights', [ 'FlightSearch', function( service ){
        return {
            restrict: 'A',
            link: function(){
                service.loadData();
            }
        }
    }]);
})();