(function(){
    angular.module( 'flishup' )
    /**
    * handlers for Flights List page
    */
    .service('FlightsList',[
    'RouteSelection',
    'DateSelection', 
    function( routeService, dateService ){
        this.date = dateService.getSelectedDate();
        this.origin = routeService.getOrigin();
        this.destination = routeService.getDestination();
        this.flights = [];

        this.setCurrentFlights = function( data ){
            this.flights = data;
        }

        return this;
    }]);
})();