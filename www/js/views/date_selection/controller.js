(function(){
    angular.module( 'flishup' )
    .controller('datePicker', [ '$scope', 'DateSelection', function( $scope, service ){
        $scope.today = service.today;
        $scope.tomorrow = service.tomorrow;
        $scope.pickTodayHandler = service.pickToday.bind(service);
        $scope.pickTomorrowHandler = service.pickTomorrow.bind(service);
    }]);
})();