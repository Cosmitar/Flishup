(function(){
    angular.module( 'flishup' )
    /**
    * handlers for Flights Search page
    */
    .service('FlightSearch',[
    '$ionicHistory', 
    '$state',
    'RouteSelection',
    'DateSelection', 
    'FlightsList',
    'server',
    function( $ionicHistory, $state, routeService, dateService, flightsService, server ){
        /**
        * triggers the flight search
        */
        this.loadData = function( ){
            var selDate = dateService.getSelectedDate();
            var twoDigits = function( val ){ return val <= 9? '0' + val : val; }
            var date = twoDigits( selDate.getDate() ) + '-' + twoDigits( selDate.getMonth() + 1 ) + '-' + selDate.getFullYear();
            var service = this;
            server.loadData( date, routeService.getOrigin().iata, routeService.getDestination().iata ).then(
                function onSuccess( res ){
                    flightsService.setCurrentFlights(res);
                    service.goToFlightList();
                },
                function onFail( res ){
                    console.log(res);
                }
            );
        };

        /**
        * shows flight list page
        * avoid back action by resetting the history root
        */
        this.goToFlightList = function(){
            $ionicHistory.nextViewOptions({
                historyRoot: true
            });
            $state.go( 'app.flightsList' );
        }

        return this;
    }]);
})();