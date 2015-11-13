(function(){
    angular.module( 'flishup' )
    .controller('AppCtrl', [ '$scope', 'App', function( $scope, app ) {
        $scope.exitApp = app.exit;
        $scope.goToOrigDest = app.goToOrigDest;
        $scope.goToDatePicker = app.goToDatePicker;
    }]);
})();
