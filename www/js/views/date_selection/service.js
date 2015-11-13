(function(){
    angular.module( 'flishup' )
    /**
    * handlers for Date Selection page
    */
    .service('DateSelection',['$ionicHistory', '$state', function( $ionicHistory, $state ){
        var _selectedDate = new Date();
        this.today = new Date();
        this.tomorrow = new Date( ( new Date( this.today ) ).setDate( this.today.getDate() + 1 ) );
        /**
        * handler for UI today selection
        */
        this.pickToday = function(){ 
            _selectedDate = this.today; 
            this.onPickDate();
        };

        /**
        * handler for UI tomorrow selection
        */
        this.pickTomorrow = function(){ 
            _selectedDate = this.tomorrow;
            this.onPickDate();
        };

        /**
        * handler for date selection confirmation
        * avoid back action on UI and shows searching flights page
        */
        this.onPickDate = function(){
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go( 'app.searchingFlights' );
        };

        this.getSelectedDate = function(){
            return _selectedDate;
        };
    }]);
})();