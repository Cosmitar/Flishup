(function(){
    /**
    * formats the member name for a given crew
    */
    var _getFormatedCrew = function( crewList ){
        var member;
        for( el in crewList ){
            member = crewList[el];
            member['shortName'] = member.name.substring( 0, member.name.indexOf(' ') + 3 ) + '.';
        }
        return crewList;
    };
    
    angular.module( 'flishup' )
    /**
    * handlers for Single Flight page
    */
    .service('SingleFlight',[
    '$stateParams', 
    'FlightsList',
    'server',
    function($stateParams, flightsService, server){
        this.flight;
        /**
        * crew storage for each selected flight
        */
        this.crew = [];
        /**
        * flag for loading process
        */
        this.loadingCrew = false;

        this.loadFlight = function(){
            var fid = $stateParams.flightId;
            this.flight = flightsService.flights[ fid ];
            this.loadingCrew = true;
            this.crew = [];
            this.loadCrew( fid, (function( data ){
                this.crew = data;
                this.loadingCrew = false;
            }).bind(this));
        };

        this.getCrew = function() {
            return this.crew;
        };

        this.isLoadingCrew = function(){
            return this.loadingCrew;
        }

        /**
        * loads the crew for a given flight id and triggers the given callback when done.
        * stores loaded crew for next requests.
        * if requested crew was laoded before, retrieves stored data on the callback.
        */
        this.loadCrew = function( fid, callback ){
            if( flightsService.flights[ fid ].crew ){
                this.crew = flightsService.flights[ fid ].crew;
                callback( this.crew );
                return;
            }
            var _this = this;
            return server.getCrew( 
                    flightsService.flights[ fid ].flight, 
                    flightsService.flights[ fid ].date
                )
                .then( 
                    function( res ){
                        flightsService.flights[ fid ].crew = _getFormatedCrew( res.crew );
                        flightsService.flights[ fid ].crew = res.crew;
                        callback( res.crew );
                    }, 
                    function( res ){ console.log( res ); }
                ).finally(function(){
                });
        };
        
        return this;
    }]);
})();
