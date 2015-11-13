// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('flishup', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($httpProvider){
    $httpProvider.defaults.useXDomain = false;
})

.constant('APP_CONFIG', {
    flightSourceUrl: '',
    crewSourceUrl: '',
    defaultOrigin: 'AEP',
    defaultDestination: 'COR'
})

.service('App',['$location', '$ionicHistory','$state',function($location, $ionicHistory, $state){
    /**
    * quits the app
    */
    this.exit = function(){
        ionic.Platform.exitApp();
    };

    /**
    * jumps UI to Origin/Destination page, avoiding back action by clearing history
    */
    this.goToOrigDest = function(){
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $state.go('app.origDest');
    };

    /**
    * jumps UI to date picker page, avoiding back action by clearing history
    */
    this.goToDatePicker = function(){
        //if( flightsService.selectedAirports ){
            $ionicHistory.clearHistory();
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('app.datePicker');
        //}
    }

    return this;
}])
/**
* format the registration of a plane from LVABC to LV-ABC
*/
.filter('registration', [function(){
    return function( input ){
        return input.substr(0,2).toUpperCase() + '-' + input.substr(2).toUpperCase();
    }
}]);