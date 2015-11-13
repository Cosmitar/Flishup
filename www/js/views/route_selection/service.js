(function(){
    angular.module( 'flishup' )
    /**
    * handlers for Route Selection page
    */
    .service('RouteSelection',['APP_CONFIG', '$location', function( config, $location ){
        var _airports = {
            EZE: {
                provName: 'Buenos Aires',
                name: 'Ministro Pistarini',
                image: './img/airports/eze.jpg',
                iata: 'EZE'
            },
            AEP: {
                provName: 'Buenos Aires',
                name: 'Jorge Newbery',
                image: './img/airports/aep.jpg',
                iata: 'AEP'
            },
            COR: {
                provName: 'Córdoba',
                name: 'Antonio Taravella',
                image: './img/airports/cor-indoor.jpg',
                iata: 'COR'
            }
        };

        /**
        * stores the two airports: origin - destination
        */
        this.airports = [ _airports[ config.defaultOrigin ], _airports[ config.defaultDestination ]];

        /**
        * switches origin by destination
        */
        this.switchAirports = function(){
            var temp = this.airports[0];
            this.airports[0] = this.airports[1];
            this.airports[1] = temp;
        };

        /**
        * handler for origin-destination confirmation
        * sends UI to date picker page
        */
        this.onPickAirports = function(){
            $location.path('/app/datePicker');
        }

        this.getOrigin = function() {
            return this.airports[0];
        }

        this.getDestination = function() {
            return this.airports[1];
        }

        return this;
    }]);
})();
